import React,{useState} from 'react'
import { Wallet, LayoutDashboard, ShieldCheck, Eye } from 'lucide-react';
const Sidebar = ({ role, setRole }) => {

  
  return (
    <div>
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-10 text-indigo-600 font-bold text-xl">
          <Wallet size={28} /> <span>ZorvynPay</span>
        </div>
        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
        </nav>

        {/* ROLE TOGGLE */}
        <div className="mt-auto pt-10 border-t border-slate-100">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Switch Role</label>
          <div className="mt-2 flex bg-slate-100 p-1 rounded-md">
            <button 
              onClick={() => setRole('Admin')}
              className={`flex-1 text-xs py-1.5 rounded flex items-center justify-center gap-1 ${role === 'Admin' ? 'bg-white shadow-sm font-bold' : ''}`}>
              <ShieldCheck size={14} /> Admin
            </button>
            <button 
              onClick={() => setRole('Viewer')}
              className={`flex-1 text-xs py-1.5 rounded flex items-center justify-center gap-1 ${role === 'Viewer' ? 'bg-white shadow-sm font-bold' : ''}`}>
              <Eye size={14} /> Viewer
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
