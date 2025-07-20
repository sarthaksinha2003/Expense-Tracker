import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload?.map((entry, index) => (
        <div key={`lwgend-${index}`} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/40 border border-fuchsia-400 shadow-md">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-white font-bold">
            {(() => {
              const match = entry.value.match(/(Rs\.?\s?\d[\d,]*)/);
              if (match) {
                const [currency] = match;
                const parts = entry.value.split(currency);
                return <>{parts[0]}<span className="font-extrabold text-fuchsia-500 ml-1">{currency}</span>{parts[1]}</>;
              }
              return entry.value;
            })()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
