const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select()
    if (error) return res.status(400).json({ error: error.message })
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET)
    res.json({ token, user: { id: data[0].id, name, email } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    if (error || !data) return res.status(400).json({ error: 'User not found' })
    const match = await bcrypt.compare(password, data.password)
    if (!match) return res.status(400).json({ error: 'Wrong password' })
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
    res.json({ token, user: { id: data.id, name: data.name, email: data.email } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router