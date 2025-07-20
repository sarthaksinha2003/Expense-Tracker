import React, { useEffect,useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

// Define colors or import them
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const ReactIncomeWithChart = ({data,totalIncome}) => {

  const[charData,setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() =>{
    prepareChartData();
    return () => {};
  },[data]);


  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 days Income</h5>
        </div>

        <CustomPieChart
            data={charData}
            label={"Total Income"}
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default ReactIncomeWithChart