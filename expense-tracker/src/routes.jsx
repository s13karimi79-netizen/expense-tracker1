import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { useApp } from './context/AppContext'

export default function AppRoutes(){
  const { state } = useApp()
  const user = state.users.find(u => u.id === state.currentUserId)
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={ user ? <Dashboard/> : <Navigate to="/login" /> } />
      <Route path="/profile" element={ user ? <Profile/> : <Navigate to="/login" /> } />
    </Routes>
  )
}
