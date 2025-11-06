import React from 'react'
import { useApp } from '../context/AppContext'
import { exportCSV, exportPDF } from '../utils/export'
import Papa from 'papaparse'

export default function ImportExport(){
  const { state, importState } = useApp()

  function handleExportCSV(){ exportCSV(state.transactions) }
  function handleExportPDF(){ exportPDF(state.transactions) }

  function handleImport(e){
    const file = e.target.files[0]
    if(!file) return
    Papa.parse(file, {
      header: true,
      complete: (results)=>{
        const rows = results.data
        const txs = rows.map(r=>({
          id: 'imp_'+Date.now() + Math.random().toString(36).slice(2,7),
          title: r.title || 'import',
          amount: Number(r.amount) || 0,
          date: r.date || new Date().toISOString().slice(0,10),
          category: r.category || 'import',
          type: r.type || (Number(r.amount) < 0 ? 'expense' : 'income'),
          walletId: Number(r.walletId) || (state.wallets[0]?.id || 1),
          userId: state.currentUserId
        }))
        importState({ ...state, transactions: [...txs, ...state.transactions] })
        alert('Import completed')
      }
    })
  }

  return (
    <div className="card p-4 mt-4 flex gap-2">
      <button onClick={handleExportCSV} className="px-3 py-2 bg-indigo-600 rounded">Export CSV</button>
      <button onClick={handleExportPDF} className="px-3 py-2 bg-indigo-600 rounded">Export PDF</button>
      <label className="px-3 py-2 bg-[rgba(255,255,255,0.02)] rounded cursor-pointer">
        Import CSV
        <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
      </label>
    </div>
  )
}
