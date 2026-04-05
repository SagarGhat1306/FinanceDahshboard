import React,{useState} from 'react'
import { PALETTE, MOCK_TRANSACTIONS } from '../assets/constants';
import { 
  LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, 
  Search, Filter, ShieldCheck, Eye, Plus, TrendingUp, PieChart 
} from 'lucide-react';
const TransetionTable = () => {

     const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
     const [role, setRole] = useState('Admin');
    
      const filteredData = MOCK_TRANSACTIONS.filter(t => filter === 'all' || t.type === filter);
  return (
    <div>
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
    </div>
  )
}

export default TransetionTable
