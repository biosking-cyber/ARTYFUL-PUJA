import { useState } from 'react'

const API = 'https://artyful-puja-backend.onrender.com/api'

export default function Login({ setUser, navigate }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/auth/${tab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.error) return setError(data.error)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      navigate('dashboard')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF8F3' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '1.5rem', width: '400px', border: '1px solid #E2D4C0' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          {tab === 'login' ? 'Welcome back' : 'Join us today'}
        </h2>
        <p style={{ color: '#8C8070', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {tab === 'login' ? 'Sign in to your account' : 'Create your free account'}
        </p>
        <div style={{ display: 'flex', marginBottom: '1.5rem', border: '1px solid #E2D4C0', borderRadius: '2rem', overflow: 'hidden' }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '0.55rem', border: 'none', cursor: 'pointer', fontSize: '0.85rem',
              background: tab === t ? '#1A1208' : 'none', color: tab === t ? '#fff' : '#8C8070'
            }}>{t === 'login' ? 'Sign in' : 'Sign up'}</button>
          ))}
        </div>
        {tab === 'register' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#8C8070' }}>Full name</label>
            <input name="name" onChange={handle} placeholder="Your name"
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #E2D4C0', borderRadius: '0.8rem', marginTop: '0.3rem', fontSize: '0.9rem' }} />
          </div>
        )}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.8rem', color: '#8C8070' }}>Email</label>
          <input name="email" onChange={handle} placeholder="you@example.com"
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #E2D4C0', borderRadius: '0.8rem', marginTop: '0.3rem', fontSize: '0.9rem' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: '#8C8070' }}>Password</label>
          <input name="password" type="password" onChange={handle} placeholder="••••••••"
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #E2D4C0', borderRadius: '0.8rem', marginTop: '0.3rem', fontSize: '0.9rem' }} />
        </div>
        {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
        <button onClick={submit} disabled={loading} style={{
          width: '100%', padding: '0.85rem', borderRadius: '2rem', border: 'none',
          background: '#C4622D', color: '#fff', fontSize: '0.95rem', cursor: 'pointer'
        }}>{loading ? 'Please wait...' : tab === 'login' ? 'Sign in' : 'Create account'}</button>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#8C8070', cursor: 'pointer' }}
          onClick={() => navigate('home')}>← Back to home</p>
      </div>
    </div>
  )
}