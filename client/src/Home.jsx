import { useState, useEffect } from 'react'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const CAT_COLORS = {
  'Food & Drink':'#2d6a4f','Shopping':'#e07b39','Transport':'#6a8cad',
  'Entertainment':'#9b6aa8','Health & Beauty':'#c0762a','Subscriptions':'#4a9a7a',
  'Home':'#7a6a4a','Education':'#4a7aaa','Other':'#888'
}

function fmt(n) {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Home() {
  const [txs, setTxs] = useState([])

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.json())
      .then(data => setTxs(data.sort((a,b) => b.date.localeCompare(a.date))))
  }, [])

  if (!txs.length) return (
    <div>
      <div className="status-bar"><span>9:41</span></div>
      <div className="app-header">
        <div className="wordmark">spending<span>habits</span></div>
        <div className="avatar">R</div>
      </div>
      <div className="empty-state">Log a purchase to see<br/>your spending story unfold.</div>
    </div>
  )

  const total = txs.reduce((s,t) => s + t.amount, 0)
  const avg = total / txs.length
  const imp = txs.filter(t => t.type === 'impulse')
  const del = txs.filter(t => t.type === 'deliberate')
  const impTotal = imp.reduce((s,t) => s + t.amount, 0)
  const delTotal = del.reduce((s,t) => s + t.amount, 0)
  const impPct = Math.round(impTotal / total * 100)
  const delPct = 100 - impPct
  const cats = {}
  txs.forEach(t => cats[t.cat] = (cats[t.cat] || 0) + t.amount)
  const sortedCats = Object.entries(cats).sort((a,b) => b[1]-a[1])
  const topCat = sortedCats[0]
  const maxCat = topCat[1]
  const days = Array(7).fill(0)
  txs.forEach(t => { const d = new Date(t.date+'T12:00:00').getDay(); days[d] += t.amount })
  const maxDay = Math.max(...days, 1)
  const avgImp = imp.length ? impTotal / imp.length : 0
  const avgDel = del.length ? delTotal / del.length : 0
  const busiestDay = days.indexOf(Math.max(...days))

  return (
    <div>
      <div className="status-bar"><span>9:41</span></div>
      <div className="app-header">
        <div className="wordmark">spending<span>habits</span></div>
        <div className="avatar">R</div>
      </div>

      <div className="hero">
        <div className="hero-label">Total spent</div>
        <div className="hero-amount">{fmt(total)}</div>
        <div className="hero-sub">{txs.length} purchases logged</div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-val">{impPct}%</div>
            <div className="hero-stat-label">Impulse rate</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">{fmt(avg)}</div>
            <div className="hero-stat-label">Avg purchase</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">{topCat[0].split(' ')[0]}</div>
            <div className="hero-stat-label">Top category</div>
          </div>
        </div>
      </div>

      <div className="insight">
        <p>
          Your spending is most concentrated in <strong>{topCat[0]}</strong>, accounting for <strong>{Math.round(topCat[1]/total*100)}%</strong> of your total.
          {imp.length && del.length ? <> Impulse purchases average <strong>{fmt(avgImp)}</strong> — {avgImp > avgDel ? 'more' : 'less'} than your deliberate average of <strong>{fmt(avgDel)}</strong>.</> : null}
          {busiestDay >= 0 ? <> You tend to spend most on <strong>{DAYS[busiestDay]}s</strong>.</> : null}
        </p>
      </div>

      <div className="sec">
        <div className="sec-title">Impulse vs deliberate</div>
        <div className="split-bar">
          <div className="split-imp" style={{width: impPct + '%'}}>
            {impPct > 15 && <span>Impulse</span>}
          </div>
          <div className="split-del" style={{width: delPct + '%'}}>
            {delPct > 15 && <span>Deliberate</span>}
          </div>
        </div>
        <div className="split-meta">
          <div className="split-meta-item"><strong>{impPct}%</strong> · {fmt(impTotal)}</div>
          <div className="split-meta-item"><strong>{delPct}%</strong> · {fmt(delTotal)}</div>
        </div>
      </div>

      <div className="sec">
        <div className="sec-title">By category</div>
        {sortedCats.map(([cat, val]) => (
          <div className="cat-row" key={cat}>
            <div className="cat-name">{cat}</div>
            <div className="cat-track">
              <div className="cat-fill" style={{width: Math.round(val/maxCat*100)+'%', background: CAT_COLORS[cat] || '#888'}}></div>
            </div>
            <div className="cat-val">{fmt(val)}</div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="sec-title">Day of the week</div>
        <div className="dow-wrap">
          {days.map((v, i) => {
            const h = Math.round((v/maxDay)*60)
            const hasImp = txs.some(t => new Date(t.date+'T12:00:00').getDay()===i && t.type==='impulse')
            return (
              <div className="dow-col" key={i}>
                <div className="dow-outer">
                  <div className="dow-inner" style={{height: h+'px', background: hasImp ? 'var(--impulse)' : 'var(--green)'}}></div>
                </div>
                <div className="dow-label">{DAYS[i].slice(0,2)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}