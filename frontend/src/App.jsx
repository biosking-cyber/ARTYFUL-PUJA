import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  const navigate = (p) => setPage(p)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setPage('home')
  }

  if (page === 'login') return <Login setUser={setUser} navigate={navigate} />
  if (page === 'dashboard') return <Dashboard user={user} navigate={navigate} logout={logout} />
  return <Home user={user} navigate={navigate} logout={logout} />
}