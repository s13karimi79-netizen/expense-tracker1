import React from 'react'
import { useApp } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export default function Topbar(){
  const { state, logout } = useApp()
  const navigate = useNavigate()
  const user = state.users.find(u=>u.id===state.currentUserId)

  const handleLogout = ()=>{ logout(); navigate('/login') }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input placeholder="جستجو..." className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] outline-none w-72"/>
          <FaSearch className="absolute right-3 top-2.5 text-gray-400"/>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-gray-300">{user.name}</div>
            <button onClick={handleLogout} className="px-3 py-2 bg-[rgba(109,40,217,0.9)] rounded">خروج</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-2 bg-[rgba(109,40,217,0.9)] rounded">ورود</Link>
        )}
      </div>
    </div>
  )
}
