import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-md bg-gray-900/70 shadow-lg rounded-xl p-3 border border-fuchsia-700 flex flex-col min-w-[120px]">
        <p className="text-xs font-semibold text-fuchsia-300 mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm text-white font-bold">
          Amount:{" "}
          <span className="text-fuchsia-200 font-extrabold">
            Rs. {payload[0].payload.amount}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({data}) => {  
    // Function to set all bars to the same color
  const getBarColor = () => "#875cf5"; // all bars vibrant purple

  return (
    <div className="bg-black mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor()} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
