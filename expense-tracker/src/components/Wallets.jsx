import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Wallets(){
  const { state, addWallet, transferBetweenWallets } = useApp()
  const [name, setName] = useState('')
  const [transfer, setTransfer] = useState({ from:'', to:'', amount:'' })

  return (
    <div className="card p-4 mt-4">
      <h3 className="font-semibold mb-3">کیف‌پول‌ها</h3>
      <div className="flex gap-2 flex-wrap mb-3">
        {state.wallets.map(w=> <div key={w.id} className="p-3 bg-[rgba(255,255,255,0.02)] rounded min-w-[150px]">{w.name}<div className="text-sm text-gray-400">{w.balance}</div></div>)}
      </div>
      <div className="flex gap-2 mb-3">
        <input placeholder="نام کیف‌پول جدید" value={name} onChange={e=>setName(e.target.value)} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
        <button onClick={()=>{ if(!name) return; addWallet({ id: Date.now(), name, balance:0 }); setName('') }} className="bg-[rgba(109,40,217,0.95)] px-3 py-2 rounded">افزودن</button>
      </div>

      <div className="border-t border-white/5 pt-3">
        <h4 className="mb-2">انتقال بین کیف‌پول‌ها</h4>
        <div className="flex gap-2 items-center">
          <select value={transfer.from} onChange={e=>setTransfer({...transfer, from:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]">
            <option value="">از</option>
            {state.wallets.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <select value={transfer.to} onChange={e=>setTransfer({...transfer, to:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]">
            <option value="">به</option>
            {state.wallets.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <input type="number" value={transfer.amount} onChange={e=>setTransfer({...transfer, amount:e.target.value})} placeholder="مبلغ" className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
          <button onClick={()=>{
            if(!transfer.from || !transfer.to || !transfer.amount) return alert('اطلاعات انتقال را وارد کنید')
            if(transfer.from===transfer.to) return alert('مقصد و مبدا نباید یکی باشند')
            const fromId = Number(transfer.from), toId = Number(transfer.to), amount = Number(transfer.amount)
            const fromWallet = state.wallets.find(w=>w.id===fromId)
            if(fromWallet.balance < amount) return alert('موجودی کافی نیست')
            transferBetweenWallets({ fromId, toId, amount })
            setTransfer({ from:'', to:'', amount:'' })
          }} className="bg-indigo-600 px-3 py-2 rounded">انتقال</button>
        </div>
      </div>
    </div>
  )
}
