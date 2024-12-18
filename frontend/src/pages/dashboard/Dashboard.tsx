import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import AllTransactionsChart from "../../components/Charts/AllTransactionsChart";
import {
  useGetAllExpensesByDateQuery,
  useLazyGetAllExpensesByDateRangeQuery,
} from "../../modules/expenses/expensesApiSlice";
import { useGetAllIncomesByDateQuery } from "../../modules/incomes/incomesApiSlice";
import AccountBalanceChart from "../../components/Charts/AccountBalanceChart";
import { TimeFrames } from "../../utils/const";
import { getDateRange } from "../../utils/dateUtils";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const { data: expenseData } = useGetAllExpensesByDateQuery();
  const { data: incomeData } = useGetAllIncomesByDateQuery();

  const [trigger, { data: expensesByDateRange }] =
    useLazyGetAllExpensesByDateRangeQuery();

  const handleTimeFrameClick = async (timeFrameKey: string) => {
    try {
      const newTimeFrame = getDateRange(timeFrameKey);
      await trigger(newTimeFrame);
    } catch (error) {
      toast.error("Error fetching date range data");
      console.log(error);
    }
  };

  useEffect(() => {
    handleTimeFrameClick(TimeFrames.THIS_MONTH);
  }, []);

  return (
    <>
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
            <div className="mt-32 ml-10 w-2/5">
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.THIS_MONTH)}
                >
                  <div className="bg-zinc-950 text-white p-1 rounded-lg">
                    This month
                  </div>
                </button>
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.LAST_MONTH)}
                >
                  <div className="bg-zinc-950 text-white p-1 rounded-lg">
                    Last month
                  </div>
                </button>
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.LAST_3_MONTHS)}
                >
                  <div className="bg-zinc-950 text-white p-1 rounded-lg">
                    Last 3 months
                  </div>
                </button>
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.LAST_6_MONTHS)}
                >
                  <div className="bg-zinc-950 text-white p-1 rounded-lg">
                    Last 6 months
                  </div>
                </button>
                <button
                  onClick={() => handleTimeFrameClick(TimeFrames.THIS_YEAR)}
                >
                  <div className="bg-zinc-950 text-white p-1 rounded-lg">
                    This year
                  </div>
                </button>
              </div>
              {expenseData && incomeData && expensesByDateRange && (
                <AccountBalanceChart
                  expenses={expensesByDateRange}
                  incomes={incomeData}
                />
              )}
            </div>
            <div className="flex justify-between">
              <div className="mt-32 ml-10 w-2/5">
                <p>Expense Chart</p>
                {expenseData && incomeData ? (
                  <AllTransactionsChart
                    expenses={expenseData}
                    incomes={incomeData}
                  />
                ) : (
                  <h2>Loading</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
