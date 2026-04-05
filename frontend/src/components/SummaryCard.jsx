import { PALETTE} from '../assets/constants.js';

export const SummaryCard = ({ title, value, type }) => {
  const isIncome = type === 'income';
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm" style={{borderColor: PALETTE.border}}>
      <p className="text-sm font-medium" style={{color: PALETTE.textSecondary}}>{title}</p>
      <h2 className="text-3xl font-bold mt-2" style={{color: PALETTE.textPrimary}}>{value}</h2>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2', color: isIncome ? PALETTE.income : PALETTE.expense}}>
          {isIncome ? '↑ 12%' : '↓ 2.4%'}
        </span>
        <span className="text-xs text-gray-400">from last month</span>
      </div>
    </div>
  );
};