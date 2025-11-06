import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function ReminderManager(){
  const { state, addReminder, deleteReminder } = useApp()
  const [form, setForm] = useState({ title:'', amount:'', date:'', repeat: '', walletId: state.wallets[0]?.id })

  function submit(e){
    e.preventDefault()
    const r = { id: 'r_'+Date.now(), ...form, userId: state.currentUserId }
    addReminder(r)
    setForm({ title:'', amount:'', date:'', repeat:'', walletId: state.wallets[0]?.id })
  }

  return (
    <div className="card p-4 mt-4">
      <h3 className="font-semibold mb-3">یادآورها</h3>
      <form onSubmit={submit} className="flex gap-2 mb-3">
        <input placeholder="عنوان" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
        <input placeholder="مبلغ" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
        <select value={form.repeat} onChange={e=>setForm({...form,repeat:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]">
          <option value="">یک‌بار</option>
          <option value="weekly">هفتگی</option>
          <option value="monthly">ماهانه</option>
        </select>
        <button className="bg-accent px-3 py-2 rounded">افزودن</button>
      </form>

      <div className="space-y-2">
        {state.reminders.length===0 ? <div className="text-gray-400">یادآوری‌ای ثبت نشده</div> : state.reminders.map(r=>(
          <div key={r.id} className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.02)] rounded">
            <div>{r.title} — {r.date} — {r.repeat || 'یک‌بار'}</div>
            <button onClick={()=>deleteReminder(r.id)} className="text-red-400">حذف</button>
          </div>
        ))}
      </div>
    </div>
  )
}
