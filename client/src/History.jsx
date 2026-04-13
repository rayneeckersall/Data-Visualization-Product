import { useState, useEffect } from 'react'

function fmt(n) {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function History() {
  const [txs, setTxs] = useState([])

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.json())
      .then(data => setTxs(data.sort((a,b) => b.date.localeCompare(a.date))))
  }, [])

  async function deleteTx(id) {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    setTxs(txs.filter(t => t.id !== id))
  }

  const grouped = txs.reduce((acc, t) => {
    acc[t.date] = acc[t.date] || []
    acc[t.date].push(t)
    return acc
  }, {})

  return (
    <div>
      <div className="status-bar"><span>9:41</span></div>
      <div className="app-header">
        <div className="page-title">History</div>
      </div>
      <div style={{padding: '0 16px'}}>
        {!txs.length && <div className="empty-state">No transactions yet.</div>}
        {Object.entries(grouped).map(([date, group]) => (
          <div key={date}>
            <div className="date-group-label">{fmtDate(date)}</div>
            {group.map(t => (
              <div className="tx" key={t.id}>
                <div className="tx-dot" style={{background: t.type === 'impulse' ? 'var(--impulse)' : 'var(--green)'}}></div>
                <div className="tx-info">
                  <div className="tx-cat">{t.cat}</div>
                  <div className="tx-meta">{t.type}{t.note ? ' · ' + t.note : ''}</div>
                </div>
                <div className="tx-amount">{fmt(t.amount)}</div>
                <div className="tx-actions">
                  <button className="tx-btn tx-btn-delete" onClick={() => deleteTx(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}