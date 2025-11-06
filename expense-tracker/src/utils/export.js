import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export function exportCSV(transactions){
  const rows = transactions.map(t=>({ id: t.id, title: t.title, amount: t.amount, date: t.date, category: t.category, walletId: t.walletId, type: t.type }))
  const csv = Papa.unparse(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'transactions.csv')
}

export function exportPDF(transactions){
  const doc = new jsPDF()
  doc.setFontSize(12)
  doc.text('Transactions', 10, 10)
  transactions.slice(0,30).forEach((t,i)=>{
    doc.text(`${i+1}. ${t.title} | ${t.amount} | ${t.date} | ${t.category}`, 10, 16 + i*7)
  })
  doc.save('transactions.pdf')
}
