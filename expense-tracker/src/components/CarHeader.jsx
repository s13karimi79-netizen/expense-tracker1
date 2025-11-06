import React from 'react'

export default function CardHeader({title, subtitle, children}){
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}
