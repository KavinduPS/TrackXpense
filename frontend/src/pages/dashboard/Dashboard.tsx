import React, { ReactNode, useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import {
  useGetAllExpensesByDateQuery,
  useGetAllExpensesByMonthQuery,
  useGetAllExpensesQuery,
  useLazyGetAllExpensesByDateRangeQuery,
} from "../../modules/expenses/expensesApiSlice";
import {
  useGetAllIncoemsQuery,
  useGetAllIncomesByDateQuery,
  useGetAllIncomesByMonthQuery,
} from "../../modules/incomes/incomesApiSlice";
import AccountBalanceChart from "../../components/Charts/AccountBalanceChart";
import { TimeFrames } from "../../utils/const";
import { getDateRange } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import Spinner from "../../components/Spin";
import CategoryChart from "../../components/Charts/ReportCharts/CategoryChart";
import { Label } from "recharts";
import IncomeExpenseBarChart from "../../components/Charts/IncomeExpenseBarChart";

const Dashboard: React.FC = () => {
  const [active, setActive] = useState<string>(TimeFrames.THIS_MONTH);

  const {
    data: expenses,
    error: expensesError,
    isLoading: isExpensesLoading,
  } = useGetAllExpensesQuery();

  const {
    data: incomes,
    error: incomesError,
    isLoading: isIncomesLoading,
  } = useGetAllIncoemsQuery();

  const { data: expenseByMonth } = useGetAllExpensesByMonthQuery();
  const { data: incomeByMonth } = useGetAllIncomesByMonthQuery();

  const { data: expenseData } = useGetAllExpensesByDateQuery();
  const { data: incomeData } = useGetAllIncomesByDateQuery();

  const [trigger, { data: expensesByDateRange }] =
    useLazyGetAllExpensesByDateRangeQuery();

  const handleTimeFrameClick = async (timeFrameKey: string) => {
    try {
      const newTimeFrame = getDateRange(timeFrameKey);
      await trigger(newTimeFrame);
      setActive(timeFrameKey);
    } catch (error) {
      toast.error("Error fetching date range data");
      console.log(error);
    }
  };

  useEffect(() => {
    handleTimeFrameClick(TimeFrames.THIS_MONTH);
  }, []);

  const totalExpenses = useMemo(
    () => expenses?.reduce((total, expense) => total + expense.amount, 0) ?? 0,
    [expenses]
  );

  const totalIncomes = useMemo(
    () => incomes?.reduce((total, income) => total + income.amount, 0) ?? 0,
    [incomes]
  );

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 ">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow relative">
          <div className="absolute top-0 right-0 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </div>

          {/* Income, Expence, Balance Cards */}
          <div className="flex justify-between mt-28 ml-14 mr-14">
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center">
              <div className="text-2xl font-semibold text-gray-200">
                Total Income
              </div>
              <div className="text-4xl font-semibold text-green-400">
                LKR: {isIncomesLoading ? <Spinner /> : totalIncomes}
              </div>
            </div>
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center">
              <div className="text-2xl font-semibold text-gray-200">
                Total Expense
              </div>
              <div className="text-4xl font-semibold text-red-400">
                LKR: {isExpensesLoading ? <Spinner /> : totalExpenses}
              </div>
            </div>
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center">
              <div className="text-2xl font-semibold text-gray-200">
                Total Balance
              </div>
              <div className="text-4xl font-semibold text-yellow-400">
                LKR: {totalIncomes - totalExpenses}
              </div>
            </div>
          </div>

          {/* Balance chart & Expenses(bar chart) */}
          <div className="flex justify-center items-center">
            <div className="mt-16 ml-14 w-3/6 h-96 rounded-lg bg-Dark p-2 text-sm">
              <div className="flex  mb-4  space-x-1 items-center justify-center pt-7">
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.THIS_MONTH)}
                >
                  <div
                    className={` w-28 py-1 rounded-lg ${
                      active === TimeFrames.THIS_MONTH
                        ? "bg-green-300 text-zinc-900"
                        : "bg-zinc-950 text-gray-300"
                    }`}
                  >
                    This month
                  </div>
                </button>

                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.LAST_MONTH)}
                >
                  <div
                    className={`py-1 rounded-lg w-28 ${
                      active === TimeFrames.LAST_MONTH
                        ? "bg-green-300 text-zinc-900"
                        : "bg-zinc-950 text-gray-300"
                    }`}
                  >
                    Last month
                  </div>
                </button>
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.LAST_3_MONTHS)}
                >
                  <div
                    className={`w-28 py-1 rounded-lg ${
                      active === TimeFrames.LAST_3_MONTHS
                        ? "bg-green-300 text-zinc-900"
                        : "bg-zinc-950 text-gray-300"
                    }`}
                  >
                    Last 3 months
                  </div>
                </button>

                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.THIS_YEAR)}
                >
                  <div
                    className={`w-28 py-1 rounded-lg ${
                      active === TimeFrames.THIS_YEAR
                        ? "bg-green-300 text-zinc-900"
                        : "bg-zinc-950 text-gray-300"
                    }`}
                  >
                    This year
                  </div>
                </button>
              </div>
              <div className="w-full  h-64 pt-5 flex justify-center ">
                {expenseData && incomeData && expensesByDateRange && (
                  <AccountBalanceChart
                    expenses={expensesByDateRange}
                    incomes={incomeData}
                  />
                )}
              </div>
            </div>
            {/* Doughnut Chart */}
            <div className="mt-16 ml-10 w-3/6 h-96 rounded-lg bg-Dark p-2 mr-14">
              <div className="text-center text-lg font-semibold mb-2 mt-5  text-gray-200">
                Category
              </div>
              <div className="flex justify-center items-center">
                <CategoryChart />
              </div>
            </div>
          </div>

          {/* Bar Chart Income/Expense */}
          <div className="flex justify-center items-center">
            <div className="w-full h-auto mb-10 text-gray-200 mt-14  bg-Dark shadow-2xl rounded-lg relative ml-14 mr-14 py-5 ">
              <p className="mb-5 text-lg font-semibold">Transaction Chart</p>
              {incomeByMonth && expenseByMonth && (
                <IncomeExpenseBarChart
                  incomes={incomeByMonth}
                  expenses={expenseByMonth}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
