import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function TransactionList(){
  const { state, deleteTransaction } = useApp()
  const [query, setQuery] = useState('')
  const [filterCat, setFilterCat] = useState('همه')
  const [range, setRange] = useState({ from:'', to:'' })

  const filtered = useMemo(()=>{
    return state.transactions.filter(t=>{
      // if multi-user, filter by userId
      const currentUser = state.currentUserId
      if(currentUser && t.userId && t.userId !== currentUser) return false

      if(filterCat !== 'همه' && t.category !== filterCat) return false
      if(query){
        const q = query.toLowerCase()
        if(!(t.title.toLowerCase().includes(q) || String(t.amount).includes(q))) return false
      }
      if(range.from && t.date < range.from) return false
      if(range.to && t.date > range.to) return false
      return true
    })
  }, [state.transactions, query, filterCat, range, state.currentUserId])

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">تراکنش‌ها</h3>
        <div className="flex gap-2">
          <input placeholder="جستجو عنوان یا مبلغ" value={query} onChange={e=>setQuery(e.target.value)} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} className="p-2 rounded bg-[rgba(0,0,0,0.2)]">
            <option value="همه">همه</option>
            {state.categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <input type="date" value={range.from} onChange={e=>setRange({...range, from:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
        <input type="date" value={range.to} onChange={e=>setRange({...range, to:e.target.value})} className="p-2 rounded bg-[rgba(0,0,0,0.2)]" />
      </div>

      <div className="space-y-2 max-h-80 overflow-auto">
        {filtered.length===0 ? <div className="text-gray-400">موردی وجود ندارد</div> : null}
        {filtered.map(tx=>(
          <div key={tx.id} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded">
            <div>
              <div className="font-medium">{tx.title}</div>
              <div className="text-sm text-gray-400">{tx.category} • {tx.date} • {state.wallets.find(w=>w.id===tx.walletId)?.name}</div>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${tx.type==='expense' ? 'text-red-400' : 'text-green-400'}`}>{tx.amount}</div>
              <div className="text-xs mt-1 flex gap-2 justify-end">
                <button onClick={()=>deleteTransaction(tx.id)} className="text-sm text-gray-300">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
