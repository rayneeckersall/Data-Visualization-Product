import { useState, useEffect } from 'react'

export default function Profile() {
  const [txCount, setTxCount] = useState(0)
  const [notifications, setNotifications] = useState(true)
  const [privacy, setPrivacy] = useState(false)

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.json())
      .then(data => setTxCount(data.length))
  }, [])

  return (
    <div>
      <div className="status-bar"><span>9:41</span></div>
      <div className="app-header">
        <div className="page-title">Profile</div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">R</div>
        <div>
          <div className="profile-name">Rayne</div>
          <div className="profile-sub">Spending Habits user</div>
          <div className="profile-count">{txCount} purchases logged</div>
        </div>
      </div>

      <div className="settings-group">
        <div className="setting-row">
          <div>
            <div className="setting-label">Notifications</div>
            <div className="setting-sub">Daily logging reminder</div>
          </div>
          <div className={`toggle ${notifications ? '' : 'off'}`} onClick={() => setNotifications(!notifications)}>
            <div className="toggle-knob"></div>
          </div>
        </div>
        <div className="setting-row">
          <div>
            <div className="setting-label">Privacy mode</div>
            <div className="setting-sub">Hide dollar amounts</div>
          </div>
          <div className={`toggle ${privacy ? '' : 'off'}`} onClick={() => setPrivacy(!privacy)}>
            <div className="toggle-knob"></div>
          </div>
        </div>
        <div className="setting-row">
          <div>
            <div className="setting-label">Currency</div>
            <div className="setting-sub">CAD — Canadian Dollar</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="settings-group">
        <div className="setting-row">
          <div className="setting-label setting-danger">Clear all data</div>
        </div>
      </div>
    </div>
  )
}