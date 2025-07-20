import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/userUserAuth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";

import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/ReactIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    console.log("Hello");
    // if (!loading) return;
    setLoading(true);
    try {
      console.log(API_PATHS.DASHBOARD.GET_DATA);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("Fetched dashboard data:", response.data);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const incomeTotal = Array.isArray(dashboardData?.totalIncome)
    ? dashboardData.totalIncome[0]?.total || 0
    : dashboardData?.totalIncome || 0;

  const expenseTotal = Array.isArray(dashboardData?.totalExpense)
    ? dashboardData.totalExpense[0]?.total || 0
    : dashboardData?.totalExpense || 0;

  const balanceTotal = dashboardData?.totalBalance || 0;

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="my-5 mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(expenseTotal)}
            color="bg-red-500"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(incomeTotal)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(balanceTotal)}
            color="bg-green-500"
          />
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransaction || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Finance Overview */}
          <FinanceOverview
            totalBalance={balanceTotal}
            totalIncome={incomeTotal}
            totalExpense={expenseTotal}
          />

          {/* Last 30 Days Expense Transactions */}
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Recent income with chart  */}
          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />
          {/* recent income with transactions card */}
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>

        {/* Graphical Chart Section */}
        <div className="mt-6">
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
