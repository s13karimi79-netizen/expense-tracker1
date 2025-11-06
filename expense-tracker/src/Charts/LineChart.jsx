import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function LineChart({ transactions }){
  const data = useMemo(()=>{
    const map = {}
    transactions.forEach(t=>{
      const key = t.date ? t.date.slice(0,7) : new Date().toISOString().slice(0,7) // YYYY-MM
      map[key] = (map[key] || 0) + Number(t.amount)
    })
    const labels = Object.keys(map).sort()
    return { labels, datasets: [{ label: 'تغییرات خالص', data: labels.map(l=>map[l]), fill: true, tension: 0.3 }] }
  }, [transactions])

  if(!data.labels.length) return <div className="text-gray-400">داده‌ای برای نمودار خطی موجود نیست</div>
  return <Line data={data} />
}
