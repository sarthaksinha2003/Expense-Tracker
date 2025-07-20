import { useEffect, useState } from "react";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default last30DaysExpenses;

// not getting result to pass to CustomBarChartfind error
