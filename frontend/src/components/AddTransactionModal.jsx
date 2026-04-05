import React, { useState } from 'react';
import { PALETTE } from '../assets/constants';
import { X } from 'lucide-react'; // Optional: npm install lucide-react

const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense',
    note: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let tempErrors = {};
    if (!formData.amount || formData.amount <= 0) tempErrors.amount = "Enter a valid amount";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.date) tempErrors.date = "Date is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({ ...formData, id: Date.now(), amount: parseFloat(formData.amount) });
      onClose();
      // Reset form
      setFormData({ date: new Date().toISOString().split('T')[0], amount: '', category: '', type: 'expense', note: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: PALETTE.border }}>
          <h3 className="text-xl font-bold" style={{ color: PALETTE.textPrimary }}>Add Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: PALETTE.textSecondary }}>Amount ($)</label>
            <input 
              type="number"
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${errors.amount ? 'border-red-500' : 'focus:ring-2'}`}
              style={{ '--tw-ring-color': PALETTE.primary }}
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type Toggle */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: PALETTE.textSecondary }}>Type</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border bg-white outline-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="income">Income 💰</option>
                <option value="expense">Expense 💸</option>
              </select>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: PALETTE.textSecondary }}>Date</label>
              <input 
                type="date"
                className="w-full px-4 py-3 rounded-lg border outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: PALETTE.textSecondary }}>Category</label>
            <select 
              className={`w-full px-4 py-3 rounded-lg border bg-white outline-none ${errors.category ? 'border-red-500' : ''}`}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              {formData.type === 'income' ? (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                </>
              ) : (
                <>
                  <option value="Food">Food & Dining</option>
                  <option value="Rent">Rent/Housing</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Medical</option>
                </>
              )}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 rounded-lg font-semibold text-white transition-all shadow-lg"
              style={{ backgroundColor: PALETTE.primary }}
              onMouseOver={(e) => e.target.style.backgroundColor = PALETTE.hover}
              onMouseOut={(e) => e.target.style.backgroundColor = PALETTE.primary}
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;