import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddTransactionModal from './AddTransactionModal';
import { PALETTE, MOCK_TRANSACTIONS } from '../assets/constants';
import TransetionTable from './TransetionTable';
import Chats from './Chats';
import StatsGrid from './StatsGrid';


const Dashboard = () => {
  const [role, setRole] = useState('Admin');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

const handleAddTransaction = (newTx) => {
  setTransactions([newTx, ...transactions]);
};

  return (
    <div className="min-h-screen" style={{backgroundColor: PALETTE.bg}}>
    
      {/* Main Content Area - Shifted for Sidebar width */}
      <main className="sm:ml-80 p-6 md:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold" style={{color: PALETTE.textPrimary}}>Finance Overview</h1>
            <p style={{color: PALETTE.textSecondary}}>Real-time insights as <strong>{role}</strong></p>
          </div>
          {role === 'Admin' && (
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-lg text-white font-medium transition-colors"
                    style={{backgroundColor: PALETTE.primary}}
                    onMouseOver={(e) => e.target.style.backgroundColor = PALETTE.hover}
                    onMouseOut={(e) => e.target.style.backgroundColor = PALETTE.primary}>
              + New Transaction
            </button>
          )}

        </header>

        {/* Stats Grid */}
          <StatsGrid />
        {/* Charts & Insights */}
       <Chats />
        {/* Transactions Table */}
        <TransetionTable />
      </main>
      {isModalOpen && (
        <AddTransactionModal
            isOpen={isModalOpen}   // ✅ IMPORTANT
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddTransaction}
        />
        )}
    </div>
  );
};

export default Dashboard;