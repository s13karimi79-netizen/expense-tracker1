import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const { state, register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'' })

  function submit(e){
    e.preventDefault()
    if(!form.name || !form.email || !form.password) return alert('همه فیلدها را پر کنید')
    if(state.users.find(u=>u.email===form.email)) return alert('ایمیل قبلا ثبت شده')
    register(form)
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto mt-10 card p-6">
      <h3 className="text-lg font-semibold mb-4">ثبت‌نام</h3>
      <form onSubmit={submit} className="space-y-2">
        <input placeholder="نام" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 rounded bg-[rgba(0,0,0,0.2)]"/>
        <input placeholder="ایمیل" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 rounded bg-[rgba(0,0,0,0.2)]"/>
        <input placeholder="رمز" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 rounded bg-[rgba(0,0,0,0.2)]"/>
        <button type="submit" className="w-full py-2 bg-accent rounded">ثبت‌نام</button>
      </form>
    </div>
  )
}
