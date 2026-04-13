import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Log from './Log'
import History from './History'
import Profile from './Profile'
import Navbar from './Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Log />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </BrowserRouter>
  )
}