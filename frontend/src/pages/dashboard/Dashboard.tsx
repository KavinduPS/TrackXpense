import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import {
  useGetAllExpensesByCategoryQuery,
  useGetAllExpensesByDateQuery,
  useGetAllExpensesByMonthQuery,
  useGetAllExpensesQuery,
  useLazyGetAllExpensesByDateRangeQuery,
} from "../../modules/expenses/expensesApiSlice";
import {
  useGetAllIncomesQuery,
  useGetAllIncomesByDateQuery,
  useGetAllIncomesByMonthQuery,
  useLazyGetAllincomesByDateRangeQuery,
} from "../../modules/incomes/incomesApiSlice";
import AccountBalanceChart from "../../components/Charts/AccountBalanceChart";
import { TimeFrames } from "../../utils/const";
import { getDateRange } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import Spinner from "../../components/Spin";
import CategoryChart from "../../components/Charts/ReportCharts/CategoryChart";
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
  } = useGetAllIncomesQuery();

  const { data: expenseByMonth, isLoading: isExpensesByMonthLoading } =
    useGetAllExpensesByMonthQuery();
  const { data: incomeByMonth, isLoading: isIncomesByMonthLoading } =
    useGetAllIncomesByMonthQuery();

  const { data: expenseData } = useGetAllExpensesByDateQuery();
  const { data: incomeData } = useGetAllIncomesByDateQuery();

  const [fetchExpensesByDateRange, { data: expensesByDateRange }] =
    useLazyGetAllExpensesByDateRangeQuery();
  const [fetchIncomesByDateRange, { data: incomesByDateRange }] =
    useLazyGetAllincomesByDateRangeQuery();

  const { data: expensesByCategory, isLoading: isExpensesByCategoryLoading } =
    useGetAllExpensesByCategoryQuery();

  const [isLoading, setIsLoading] = useState(true);

  const handleTimeFrameClick = async (timeFrameKey: string) => {
    try {
      setIsLoading(true);
      const newTimeFrame = getDateRange(timeFrameKey);
      await Promise.all([
        fetchExpensesByDateRange(newTimeFrame),
        fetchIncomesByDateRange(newTimeFrame),
      ]);
      setActive(timeFrameKey);
    } catch (error) {
      toast.error("Error fetching date range data");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initilizeData = async () => {
      try {
        handleTimeFrameClick(TimeFrames.THIS_MONTH);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    initilizeData();
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
        <div className="flex fixed">
          <Sidebar />
        </div>
        <div className="flex-grow pl-80">
          <div className="absolute top-0 right-8 p-6 w-1/4">
            <img src={logo} alt="Logo" />
          </div>

          {/* Income, Expence, Balance Cards */}
          <div className="flex justify-between mt-28 ml-14 mr-14">
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center relative">
              <div className="text-2xl font-semibold text-gray-200">
                Total Income
              </div>
              <div className="text-4xl font-semibold text-green-400">
                LKR:{" "}
                {isIncomesLoading ? (
                  <div className="text-green-400 w-80 h-36 rounded-lg absolute flex justify-center items-center inset-0 bg-zinc-900 bg-opacity-70">
                    <Spinner />
                  </div>
                ) : (
                  totalIncomes.toLocaleString()
                )}
              </div>
            </div>
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center relative">
              <div className="text-2xl font-semibold text-gray-200">
                Total Expense
              </div>
              <div className="text-4xl font-semibold text-red-400">
                LKR:{" "}
                {isExpensesLoading ? (
                  <div className="text-red-400 w-80 h-36 rounded-lg absolute flex justify-center items-center inset-0 bg-zinc-900 bg-opacity-70">
                    <Spinner />
                  </div>
                ) : (
                  totalExpenses.toLocaleString()
                )}
              </div>
            </div>
            <div className="w-80 h-36 bg-Dark  rounded-lg flex flex-col justify-center items-center relative">
              <div className="text-2xl font-semibold text-gray-200">
                Total Balance
              </div>
              <div className="text-4xl font-semibold text-yellow-400">
                LKR:{" "}
                {isIncomesLoading && isExpensesLoading ? (
                  <div className="text-yellow-400 w-80 h-36 rounded-lg absolute flex justify-center items-center inset-0 bg-zinc-900 bg-opacity-70">
                    <Spinner />
                  </div>
                ) : (
                  (totalIncomes - totalExpenses).toLocaleString()
                )}
              </div>
            </div>
          </div>

          {/* Balance chart  */}
          <div className="flex justify-center items-center">
            <div className="mt-12 ml-14 w-3/6 h-96 rounded-lg bg-Dark p-2 text-sm">
              <div className="text-center text-lg font-semibold mt-5  text-gray-200">
                Account balance
              </div>
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
              <div className="w-full h-64 pt-1 flex justify-center relative">
                {isLoading ? (
                  <div className="w-full h-40 flex items-center text-blue-700 absolute bg-Dark bg-opacity-80">
                    <Spinner />
                  </div>
                ) : (
                  expensesByDateRange &&
                  incomesByDateRange && (
                    <AccountBalanceChart
                      expenses={expensesByDateRange}
                      incomes={incomesByDateRange}
                    />
                  )
                )}
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="mt-12 ml-10 w-3/6 h-96 rounded-lg bg-Dark p-2 mr-14 relative">
              <div className="text-center text-lg font-semibold mb-2 mt-5  text-gray-200">
                Expenses by Category
              </div>
              <div className="flex justify-center items-center relative">
                {isExpensesByCategoryLoading ? (
                  <div className="w-full h-72 rounded-lg bg-Dark p-2 mr-14 absolute inset-0 bg-opacity-80 text-blue-700">
                    <Spinner />
                  </div>
                ) : (
                  expensesByCategory && (
                    <CategoryChart expenses={expensesByCategory} />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bar Chart Income/Expense */}
          <div className="flex justify-center items-center">
            <div className="w-full h-[500px] mb-12 text-gray-200 mt-14  bg-Dark shadow-2xl rounded-lg relative ml-14 mr-14 py-5 ">
              <p className="mb-5 text-lg font-semibold">
                Monthly Transaction Breakdown
              </p>

              {isExpensesByMonthLoading && isIncomesByMonthLoading ? (
                <div className="w-full h-[500px]  rounded-lg relative  ">
                  <Spinner />
                </div>
              ) : (
                incomeByMonth &&
                expenseByMonth && (
                  <IncomeExpenseBarChart
                    incomes={incomeByMonth}
                    expenses={expenseByMonth}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
