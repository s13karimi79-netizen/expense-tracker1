import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ transactions }){
  const data = useMemo(()=>{
    const map = {}
    transactions.forEach(t=>{
      if(t.type === 'expense'){ const cat = t.category || 'بدون دسته'; map[cat] = (map[cat]||0) + Math.abs(Number(t.amount)) }
    })
    return { labels: Object.keys(map), datasets: [{ data: Object.values(map), backgroundColor: ['#6d28d9','#06b6d4','#8b5cf6','#ef4444','#f97316'] }] }
  }, [transactions])

  if(!data.labels.length) return <div className="text-gray-400">داده‌ای برای نمودار دایره‌ای موجود نیست</div>
  return <Pie data={data} />
}
