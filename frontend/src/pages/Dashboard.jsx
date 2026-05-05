import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api'

export default function Dashboard({ user, navigate, logout }) {
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${API}/courses/my-courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F3' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', borderBottom: '1px solid #E2D4C0', background: '#FDF8F3' }}>
        <div style={{ fontFamily: 'serif', fontSize: '1.5rem' }}>
          Artyful <span style={{ color: '#C4622D', fontStyle: 'italic' }}>Puja</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#8C8070' }}>Hi, {user?.name} 👋</span>
          <button onClick={() => navigate('home')} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: '1px solid #1A1208', background: 'none', cursor: 'pointer' }}>Home</button>
          <button onClick={logout} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', border: 'none', background: '#C4622D', color: '#fff', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '3rem 4rem' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' }}>My Courses</h2>
        <p style={{ color: '#8C8070', marginBottom: '2rem' }}>Courses you have enrolled in</p>

        {selected ? (
          <div>
            <button onClick={() => setSelected(null)} style={{ marginBottom: '1.5rem', padding: '0.5rem 1.2rem', borderRadius: '2rem', border: '1px solid #1A1208', background: 'none', cursor: 'pointer' }}>← Back</button>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '1rem' }}>{selected.courses.title}</h3>
            <iframe
              width="100%" height="450"
              src={selected.courses.video_url}
              title={selected.courses.title}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: '1rem' }}
            />
          </div>
        ) : (
          <>
            {courses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#8C8070' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</p>
                <button onClick={() => navigate('home')} style={{
                  padding: '0.8rem 2rem', borderRadius: '2rem', border: 'none',
                  background: '#C4622D', color: '#fff', cursor: 'pointer'
                }}>Browse Courses</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {courses.map(order => (
                  <div key={order.id} onClick={() => setSelected(order)} style={{
                    background: '#fff', border: '1px solid #E2D4C0', borderRadius: '1.2rem',
                    overflow: 'hidden', cursor: 'pointer'
                  }}>
                    <div style={{ height: '140px', background: 'linear-gradient(135deg, #F5E6D3, #D4A574)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎨</div>
                    <div style={{ padding: '1.2rem' }}>
                      <h3 style={{ fontFamily: 'serif', fontSize: '1rem' }}>{order.courses.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#7A9E7E', marginTop: '0.5rem' }}>✓ Enrolled</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}