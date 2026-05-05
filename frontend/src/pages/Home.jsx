import { useState, useEffect } from 'react'

const API = 'https://artyful-puja-backend.onrender.com/api'

export default function Home({ user, navigate, logout }) {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`${API}/courses`)
      .then(r => r.json())
      .then(setCourses)
      .catch(() => {})
  }, [])

  return (
    <div>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', borderBottom: '1px solid #E2D4C0', background: '#FDF8F3', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'serif', fontSize: '1.5rem' }}>
          Artyful <span style={{ color: '#C4622D', fontStyle: 'italic' }}>Puja</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {user ? (
            <>
              <button onClick={() => navigate('dashboard')} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: '1px solid #1A1208', background: 'none', cursor: 'pointer' }}>Dashboard</button>
              <button onClick={logout} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: 'none', background: '#C4622D', color: '#fff', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('login')} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: '1px solid #1A1208', background: 'none', cursor: 'pointer' }}>Sign in</button>
              <button onClick={() => navigate('login')} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: 'none', background: '#C4622D', color: '#fff', cursor: 'pointer' }}>Get started</button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: '5rem 4rem', textAlign: 'center', background: '#FDF8F3' }}>
        <p style={{ color: '#C4622D', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>✦ CREATIVE COURSES ONLINE</p>
        <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Learn to create <span style={{ color: '#C4622D', fontStyle: 'italic' }}>beautiful art</span> from home
        </h1>
        <p style={{ color: '#8C8070', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
          Expert-led courses in illustration, watercolour, digital art and more.
        </p>
        <button onClick={() => navigate('login')} style={{
          padding: '0.9rem 2.5rem', borderRadius: '2.5rem', border: 'none',
          background: '#C4622D', color: '#fff', fontSize: '1rem', cursor: 'pointer'
        }}>Start learning today →</button>
      </div>

      {/* COURSES */}
      <div style={{ padding: '3rem 4rem' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '2rem' }}>All Courses</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {courses.length === 0 ? (
            <p style={{ color: '#8C8070' }}>Loading courses...</p>
          ) : courses.map(course => (
            <div key={course.id} style={{
              background: '#fff', border: '1px solid #E2D4C0', borderRadius: '1.2rem', overflow: 'hidden'
            }}>
              <div style={{ height: '160px', background: 'linear-gradient(135deg, #F5E6D3, #D4A574)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎨</div>
              <div style={{ padding: '1.2rem' }}>
                <h3 style={{ fontFamily: 'serif', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{course.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#8C8070', marginBottom: '0.8rem' }}>{course.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2D4C0', paddingTop: '0.8rem' }}>
                  <span style={{ fontFamily: 'serif', fontSize: '1.2rem' }}>₹{course.price}</span>
                  <button onClick={() => navigate('login')} style={{
                    border: '1px solid #C4622D', color: '#C4622D', background: 'none',
                    padding: '0.35rem 0.9rem', borderRadius: '1.5rem', fontSize: '0.75rem', cursor: 'pointer'
                  }}>Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 4rem', borderTop: '1px solid #E2D4C0', display: 'flex', justifyContent: 'space-between', color: '#8C8070', fontSize: '0.85rem' }}>
        <span style={{ fontFamily: 'serif' }}>Artyful <span style={{ color: '#C4622D' }}>Puja</span></span>
        <span>© 2025 Artyful Puja. All rights reserved.</span>
      </footer>
    </div>
  )
}