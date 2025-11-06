import React from 'react'
import { useApp } from '../context/AppContext'

export default function Profile(){
  const { state } = useApp()
  const user = state.users.find(u=>u.id===state.currentUserId)
  if(!user) return <div>کاربر یافت نشد</div>

  const userTx = state.transactions.filter(t=> t.userId ? t.userId === user.id : true)
  const balance = state.wallets.reduce((s,w)=> s + w.balance, 0)

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-3">پروفایل {user.name}</h3>
      <div className="mb-2">ایمیل: {user.email}</div>
      <div className="mb-2">تعداد تراکنش‌ها: {userTx.length}</div>
      <div className="mb-2">جمع موجودی‌ها: {balance}</div>
    </div>
  )
}
