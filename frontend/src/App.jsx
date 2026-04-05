import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Sidebar from './components/Sidebar'
import FinanceDashboard from './FinanceDashboard'

function App() {
  const [role, setRole] = useState('Admin');

  return (
    <div className="flex iteams-start h-screen">
      
      {/* Sidebar (30%) */}
      <div className="w-[20%] bg-amber-100 max-w-[300px]">
        <Sidebar role={role} setRole={setRole} />
      </div>

      {/* Main Content (70%) */}
      <div className="w-[80%] bg-amber-300  overflow-y-auto">
        <Home />
      </div>

      <FinanceDashboard />

    </div>
  )
}

export default App