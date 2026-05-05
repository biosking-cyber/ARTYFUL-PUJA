const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const { createClient } = require('@supabase/supabase-js')
const jwt = require('jsonwebtoken')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Not logged in' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Create order
router.post('/create-order', auth, async (req, res) => {
  const { course_id, amount } = req.body
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${course_id}_${req.user.id}`
    })
    res.json({ order_id: order.id, amount: order.amount })
  } catch (err) {
    res.status(500).json({ error: 'Payment error' })
  }
})

// Confirm payment
router.post('/confirm', auth, async (req, res) => {
  const { course_id, order_id } = req.body
  try {
    const { error } = await supabase
      .from('orders')
      .insert([{ user_id: req.user.id, course_id, order_id, status: 'paid' }])
    if (error) return res.status(400).json({ error: error.message })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router