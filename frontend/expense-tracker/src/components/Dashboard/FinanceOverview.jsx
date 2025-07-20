import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#10B981', '#EF4444', '#3B82F6']; // Balance, Expense, Income

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const incomeTotal = Array.isArray(totalIncome) ? totalIncome[0]?.total || 0 : totalIncome;
  const expenseTotal = Array.isArray(totalExpense) ? totalExpense[0]?.total || 0 : totalExpense;

  const balanceData = [
    { name: 'Total Balance', amount: totalBalance || 0 },
    { name: 'Total Expense', amount: expenseTotal },
    { name: 'Total Income', amount: incomeTotal },
  ];

  return (
    <div className='card bg-[#1f2937] p-4 rounded-xl shadow-lg'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-semibold text-white'>Financial Overview</h5>
      </div>

      <CustomPieChart 
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        labelColor="#F3F4F6"
        amountColor="#fde047" // yellow-300 for balance
      />

      {/* Displaying each value below the chart */}
      <div className='mt-6 space-y-3'>
        <div className='flex justify-between'>
          <span className='text-gray-300 text-md'>Total Income</span>
          <span className='text-cyan-400 font-extrabold text-xl drop-shadow'>₹{incomeTotal.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-300 text-md'>Total Expense</span>
          <span className='text-rose-400 font-extrabold text-xl drop-shadow'>₹{expenseTotal.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-300 text-md'>Total Balance</span>
          <span className='text-yellow-300 font-extrabold text-xl drop-shadow'>₹{totalBalance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
