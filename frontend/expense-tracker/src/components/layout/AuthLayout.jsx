// AuthLayout.jsx
import React from 'react';
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-violet-700 p-4 rounded-xl shadow-lg border border-violet-500 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-lg bg-violet-900`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-violet-200 font-semibold">{label}</h6>
        <span className="text-[22px] font-bold text-white">{value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-medium text-gray-100">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:flex flex-col justify-center items-center w-[40vw] h-screen bg-gray-800 dark:bg-gray-800 overflow-hidden p-8 relative">
        <div className="w-full max-w-md bg-gradient-to-br from-violet-700 via-violet-800 to-fuchsia-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative border-2 border-violet-500">
          <svg className="w-12 h-12 text-fuchsia-300 absolute -top-6 left-1/2 -translate-x-1/2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h.01M15 7h.01M7 11c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4zm0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2" /></svg>
          <p className="text-2xl font-semibold text-white italic text-center mb-3 drop-shadow-lg">
            Track your <span className="text-fuchsia-300 font-bold">expenses</span>, grow your <span className="text-violet-300 font-bold">savings</span>, and take control of your <span className="text-fuchsia-200 font-bold">financial future</span>.
          </p>
          <span className="text-violet-200 text-base mt-2 font-medium tracking-wide">— Expense Tracker Team</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
