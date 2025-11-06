import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'

export default function TransactionForm(){
  const { state, addTransaction, addCategory } = useApp()
  const [form, setForm] = useState({ title:'', amount:'', date:'', category: state.categories[0] || '', type:'expense', walletId: state.wallets[0]?.id || 1 })

  function submit(e){
    e.preventDefault()
    if(!form.title || !form.amount) return alert('عنوان و مبلغ را وارد کنید')
    const tx = { id: uuidv4(), title: form.title, amount: Number(form.amount), date: form.date || new Date().toISOString().slice(0,10), category: form.category, type: form.type, walletId: Number(form.walletId) }
    addTransaction(tx)
    setForm({ title:'', amount:'', date:'', category: state.categories[0] || '', type:'expense', walletId: state.wallets[0]?.id || 1 })
  }

  return (
    <form onSubmit={submit} className="card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">افزودن تراکنش</div>
      </div>

      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="عنوان" className="w-full mb-2 p-2 rounded bg-[rgba(0,0,0,0.2)]" />
      <input value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} placeholder="مبلغ" type="number" className="w-full mb-2 p-2 rounded bg-[rgba(0,0,0,0.2)]" />
      <input value={form.date} onChange={e=>setForm({...form, date:e.target.value})} type="date" className="w-full mb-2 p-2 rounded bg-[rgba(0,0,0,0.2)]" />

      <div className="flex gap-2 mb-2">
        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="flex-1 p-2 rounded bg-[rgba(0,0,0,0.2)]">
          {state.categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="دسته جدید (Enter)" onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); if(e.target.value) addCategory(e.target.value); e.target.value='' } }} className="w-40 p-2 rounded bg-[rgba(0,0,0,0.2)]" />
      </div>

      <div className="flex gap-2 mb-3">
        <select value={form.walletId} onChange={e=>setForm({...form,walletId:e.target.value})} className="flex-1 p-2 rounded bg-[rgba(0,0,0,0.2)]">
          {state.wallets.map(w=> <option key={w.id} value={w.id}>{w.name} — {w.balance}</option>)}
        </select>
        <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="w-32 p-2 rounded bg-[rgba(0,0,0,0.2)]">
          <option value="expense">هزینه</option>
          <option value="income">درآمد</option>
        </select>
      </div>

      <button type="submit" className="w-full py-2 rounded bg-[rgba(109,40,217,0.95)] hover:opacity-95">ذخیره</button>
    </form>
  )
}
