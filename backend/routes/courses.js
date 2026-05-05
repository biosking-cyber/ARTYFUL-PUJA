const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const jwt = require('jsonwebtoken')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Middleware to check login
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

// Get all courses (public)
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// Get my purchased courses (private)
router.get('/my-courses', auth, async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, courses(*)')
    .eq('user_id', req.user.id)
    .eq('status', 'paid')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

module.exports = router