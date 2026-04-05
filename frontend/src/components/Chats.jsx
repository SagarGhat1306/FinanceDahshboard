import React from 'react'
import { PALETTE, MOCK_TRANSACTIONS } from '../assets/constants';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart  
} from 'recharts';
const Chats = () => {
  const DATA_TREND = [
  { name: 'Mon', balance: 2100 },
  { name: 'Tue', balance: 1980 },
  { name: 'Wed', balance: 1530 },
  { name: 'Thu', balance: 1450 },
  { name: 'Fri', balance: 3200 },
];
  return (
    <div>
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
        
    </div>
    
  )
}

export default Chats
