import React from 'react';
import { FaCrown } from 'react-icons/fa';

const features = [
  {
    icon: <FaCrown className="text-[#875cf5] text-xl" />, // Use app's purple
    title: 'Voice Input',
    desc: 'Add income and expenses by speaking, hands-free.'
  },
  {
    icon: <FaCrown className="text-[#875cf5] text-xl" />,
    title: 'AI Stock Suggestions',
    desc: 'Get personalized stock investment suggestions.'
  },
  {
    icon: <FaCrown className="text-[#875cf5] text-xl" />,
    title: 'Budget Analyzer',
    desc: 'Monthly spending insights and personalized saving tips.'
  },
  {
    icon: <FaCrown className="text-[#875cf5] text-xl" />,
    title: 'Multi-Account Sync',
    desc: 'Connect and sync multiple bank accounts for unified tracking.'
  }
];

const PremiumFeaturesModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative z-50 bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-[#875cf5] flex flex-col items-center max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-[#875cf5] text-3xl font-bold z-50"
        onClick={onClose}
        aria-label="Close"
        style={{lineHeight: 1}}
      >
        &#10005;
      </button>
      <div className="flex flex-col items-center mb-6">
        <FaCrown className="text-4xl text-[#875cf5] mb-2" />
        <h2 className="text-2xl font-bold text-[#875cf5] mb-1">Premium Features</h2>
        <p className="text-gray-300 text-center text-sm">Unlock the full power of Expense Tracker with these exclusive features:</p>
      </div>
      <ul className="space-y-4 mb-6 w-full">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span>{f.icon}</span>
            <div>
              <h4 className="text-lg font-semibold text-[#b39ddb]">{f.title}</h4>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="w-full py-3 rounded-lg bg-[#875cf5] text-white font-bold text-lg shadow hover:bg-[#7c3aed] transition-colors"
        onClick={() => {}}
      >
        Subscribe to Premium
      </button>
    </div>
  </div>
);

export default PremiumFeaturesModal; 