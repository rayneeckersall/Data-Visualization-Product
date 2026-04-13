import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="10" width="4" height="9" rx="1" fill="currentColor" opacity="0.5"/>
          <rect x="8" y="6" width="4" height="13" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="15" y="2" width="4" height="17" rx="1" fill="currentColor"/>
        </svg>
        <span className="nav-label">Overview</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 10V5M10 10L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="nav-label">History</span>
      </NavLink>
      <NavLink to="/log" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="nav-label">Log</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 18c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="nav-label">Profile</span>
      </NavLink>
    </nav>
  )
}