import React from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import Wallets from '../components/Wallets'
import PieChart from '../components/Charts/PieChart'
import LineChart from '../components/Charts/LineChart'
import ImportExport from '../components/ImportExport'
import ReminderManager from '../components/ReminderManager'
import { useApp } from '../context/AppContext'

export default function Dashboard(){
  const { state } = useApp()
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4"><LineChart transactions={state.transactions} /></div>
            <div className="card p-4"><PieChart transactions={state.transactions} /></div>
          </div>

          <div className="mt-4"><TransactionList /></div>
        </div>

        <div>
          <TransactionForm />
          <Wallets />
          <ImportExport />
          <ReminderManager />
        </div>
      </div>
    </div>
  )
}
