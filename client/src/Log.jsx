import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Food & Drink', color: '#2d6a4f' },
  { name: 'Shopping', color: '#e07b39' },
  { name: 'Transport', color: '#6a8cad' },
  { name: 'Entertainment', color: '#9b6aa8' },
  { name: 'Health & Beauty', color: '#c0762a' },
  { name: 'Subscriptions', color: '#4a9a7a' },
  { name: 'Home', color: '#7a6a4a' },
  { name: 'Education', color: '#4a7aaa' },
  { name: 'Other', color: '#888' },
]

export default function Log() {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState('')
  const [cat, setCat] = useState('')
  const [catColor, setCatColor] = useState('var(--ink3)')
  const [type, setType] = useState('')
  const [note, setNote] = useState('')
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSubmit() {
    if (!date || !amount || !cat || !type) {
      alert('Please fill in date, amount, category and type.')
      return
    }
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, amount: parseFloat(amount), cat, type, note })
    })
    navigate('/')
  }

  return (
    <div>
      <div className="status-bar"><span>9:41</span></div>
      <div className="app-header">
        <div className="page-title">Log a purchase</div>
      </div>
      <div style={{padding: '0 16px'}}>
        <div className="field">
          <div className="field-label">Date</div>
          <input className="field-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="field">
          <div className="field-label">Amount ($)</div>
          <input className="field-input" type="number" placeholder="0.00" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="field">
          <div className="field-label">Category</div>
          <div className="custom-select" ref={dropRef}>
            <div className={`cs-selected ${dropOpen ? 'open' : ''}`} onClick={() => setDropOpen(!dropOpen)}>
              <span style={{color: catColor, fontWeight: cat ? '500' : '400'}}>{cat || 'Select...'}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={`cs-dropdown ${dropOpen ? 'open' : ''}`}>
              {CATEGORIES.map(c => (
                <div className="cs-option" key={c.name} onClick={() => { setCat(c.name); setCatColor(c.color); setDropOpen(false) }}>
                  <span className="cs-dot" style={{background: c.color}}></span>
                  <span style={{color: c.color}}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="field-label">Was this planned?</div>
          <div className="type-row">
            <button className={`type-btn ${type === 'impulse' ? 'sel-impulse' : ''}`} onClick={() => setType('impulse')}>Impulse</button>
            <button className={`type-btn ${type === 'deliberate' ? 'sel-deliberate' : ''}`} onClick={() => setType('deliberate')}>Deliberate</button>
          </div>
        </div>
        <div className="field">
          <div className="field-label">Notes (optional)</div>
          <input className="field-input" type="text" placeholder="Add a note..." value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Log purchase</button>
      </div>
    </div>
  )
}