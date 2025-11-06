import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })

  function submit(e){
    e.preventDefault()
    if(login(form.email, form.password)) navigate('/')
    else alert('اطلاعات ورود صحیح نیست')
  }

  return (
    <div className="max-w-md mx-auto mt-10 card p-6">
      <h3 className="text-lg font-semibold mb-4">ورود</h3>
      <form onSubmit={submit} className="space-y-2">
        <input placeholder="ایمیل" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 rounded bg-[rgba(0,0,0,0.2)]"/>
        <input placeholder="رمز" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 rounded bg-[rgba(0,0,0,0.2)]"/>
        <button type="submit" className="w-full py-2 bg-accent rounded">ورود</button>
        <div className="text-center text-sm mt-2"><Link to="/register" className="text-cyan-400">ثبت‌نام</Link></div>
      </form>
    </div>
  )
}
