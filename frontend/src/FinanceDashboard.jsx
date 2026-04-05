import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, 
  Search, Filter, ShieldCheck, Eye, Plus, TrendingUp, PieChart 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePie, Pie, Cell 
} from 'recharts';

import { INITIAL_TRANSACTIONS, DATA_TREND } from './assets/mockData';

// // --- MOCK DATA ---
// const INITIAL_TRANSACTIONS = [
//   { id: 1, date: '2026-04-01', amount: 2500, category: 'Salary', type: 'income' },
//   { id: 2, date: '2026-04-02', amount: 120, category: 'Food', type: 'expense' },
//   { id: 3, date: '2026-04-03', amount: 450, category: 'Rent', type: 'expense' },
//   { id: 4, date: '2026-04-04', amount: 80, category: 'Transport', type: 'expense' },
//   { id: 5, date: '2026-04-05', amount: 200, category: 'Shopping', type: 'expense' },
// ];

// const DATA_TREND = [
//   { name: 'Mon', balance: 2100 },
//   { name: 'Tue', balance: 1980 },
//   { name: 'Wed', balance: 1530 },
//   { name: 'Thu', balance: 1450 },
//   { name: 'Fri', balance: 3200 },
// ];

const COLORS = ['#6366f1', '#f43f5e', '#22c55e', '#eab308'];

export default function FinanceDashboard() {
  const [role, setRole] = useState('Admin'); // Role State: 'Admin' or 'Viewer'
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  // --- LOGIC: Insights & Filtering ---
  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || t.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);

  // --- COMPONENTS ---
  return (
    <div className="min-h-screen no-scrollbar bg-slate-50 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Financial Overview</h1>
            <p className="text-slate-500">Welcome back, {role} Mode</p>
          </div>
          {role === 'Admin' && (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
              <Plus size={20} /> Add Transaction
            </button>
          )}
        </header>

        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Balance" value={`$${totalBalance}`} icon={<TrendingUp className="text-indigo-600"/>} trend="+12%" />
          <Card title="Income" value="$2,500" icon={<ArrowUpRight className="text-green-600"/>} trend="+5%" />
          <Card title="Expenses" value="$850" icon={<ArrowDownLeft className="text-red-600"/>} trend="-2%" />
        </section>

        {/* CHARTS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Balance Trend</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA_TREND}>
                  <defs>
                    <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="balance" stroke="#6366f1" fillOpacity={1} fill="url(#colorBal)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Insights: Highest Category</h3>
            <div className="flex items-center justify-around h-[250px]">
               <div className="text-center">
                 <p className="text-slate-400 text-sm">Most Spent on</p>
                 <p className="text-2xl font-bold text-red-500">Rent</p>
                 <p className="text-xs text-slate-400 mt-2">60% of total expenses</p>
               </div>
               <PieChart size={100} className="text-indigo-200 opacity-50" />
            </div>
          </div>
        </section>

        {/* TRANSACTIONS TABLE */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-indigo-500"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select 
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  {role === 'Admin' && <th className="px-6 py-4 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm">{item.date}</td>
                    <td className="px-6 py-4 font-medium">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-bold ${item.type === 'income' ? 'text-green-600' : 'text-slate-800'}`}>
                      {item.type === 'income' ? '+' : '-'}${item.amount}
                    </td>
                    {role === 'Admin' && (
                      <td className="px-6 py-4 text-center">
                        <button className="text-indigo-600 text-xs font-semibold hover:underline">Edit</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function Card({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
        <span className="text-xs font-semibold text-green-500 mt-2 block">{trend} vs last month</span>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    </div>
  );
}