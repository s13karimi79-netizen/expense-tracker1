import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Topbar />
          <RoutesApp />
        </div>
      </div>
    </BrowserRouter>
  )
}
