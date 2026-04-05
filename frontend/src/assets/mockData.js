// Function to generate 1000 transactions for the past year
const generateMockData = () => {
  const transactions = [];
  const categories = {
    income: ["Salary", "Freelance", "Dividends", "Rental Income"],
    expense: ["Food", "Rent", "Transport", "Shopping", "Health", "Utilities", "Entertainment", "Insurance"]
  };

  const startDate = new Date("2025-04-06"); // One year ago from your deadline
  const endDate = new Date("2026-04-06");

  for (let i = 1; i <= 1000; i++) {
    // Pick a random date between start and end
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    // 20% chance of being income, 80% chance of being expense (standard financial behavior)
    const type = Math.random() > 0.8 ? "income" : "expense";
    const categoryList = categories[type];
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    
    // Realistic amounts
    let amount;
    if (type === "income") {
      amount = Math.floor(Math.random() * (5000 - 500) + 500); // Income between 500 and 5000
    } else {
      amount = Math.floor(Math.random() * (200 - 10) + 10); // Expenses between 10 and 200
    }

    transactions.push({
      id: i,
      date: randomDate.toISOString().split('T')[0],
      amount: amount,
      category: category,
      type: type,
    });
  }

  // Sort by date (latest first)
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Generate the 1000 records
export const INITIAL_TRANSACTIONS = generateMockData();

// Generate DATA_TREND (Daily balance for the last 30 days for the chart)
const generateTrendData = (allTransactions) => {
  const last30Days = [];
  const today = new Date("2026-04-06");

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Calculate total balance up to this date
    const dayBalance = allTransactions
      .filter(t => t.date <= dateStr)
      .reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);

    last30Days.push({
      name: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      balance: dayBalance,
      fullDate: dateStr
    });
  }
  return last30Days;
};

export const DATA_TREND = generateTrendData(INITIAL_TRANSACTIONS);

// Summary Stats
export const SUMMARY_STATS = {
    totalIncome: INITIAL_TRANSACTIONS.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpense: INITIAL_TRANSACTIONS.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
};