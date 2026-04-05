import React,{useState} from 'react'
import { SummaryCard } from './SummaryCard';
import { 
  LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, 
  Search, Filter, ShieldCheck, Eye, Plus, TrendingUp, PieChart 
} from 'lucide-react';



const StatsGrid = () => {

  const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-04-01', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-04-02', amount: 120, category: 'Food', type: 'expense' },
  { id: 3, date: '2026-04-03', amount: 450, category: 'Rent', type: 'expense' },
  { id: 4, date: '2026-04-04', amount: 80, category: 'Transport', type: 'expense' },
  { id: 5, date: '2026-04-05', amount: 200, category: 'Shopping', type: 'expense' },
];

    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

   const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
  return (
   <div>
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Balance" value={`$${totalBalance}`} icon={<TrendingUp className="text-indigo-600"/>} trend="+12%" />
          <Card title="Income" value="$2,500" icon={<ArrowUpRight className="text-green-600"/>} trend="+5%" />
          <Card title="Expenses" value="$850" icon={<ArrowDownLeft className="text-red-600"/>} trend="-2%" />
        </section>
    </div>  
      
  )
}

export default StatsGrid


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