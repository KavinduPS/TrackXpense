import React, { useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import AllTransactionsChart from "../../components/Charts/AllTransactionsChart";
import {
  useGetAllExpensesByDateQuery,
  useGetAllExpensesQuery,
} from "../../modules/expenses/expensesApiSlice";
import {
  useGetAllIncoemsQuery,
  useGetAllIncomesByDateQuery,
} from "../../modules/incomes/incomesApiSlice";
import Spinner from "../../components/Spin";
import CategoryChart from "../../components/Charts/ReportCharts/CategoryChart";

const Dashboard: React.FC = () => {
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

  const { data: expenseData } = useGetAllExpensesByDateQuery();
  const { data: incomeData } = useGetAllIncomesByDateQuery();

  const totalExpenses = useMemo(
    () => expenses?.reduce((total, expense) => total + expense.amount, 0) ?? 0,
    [expenses]
  );

  const totalIncomes = useMemo(
    () => incomes?.reduce((total, income) => total + income.amount, 0) ?? 0,
    [incomes]
  );
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="absolute top-0 right-0 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </div>
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
          <div className="flex justify-between w-full">
            <div className="w-3/6 h-96 text-gray-200 mt-14 ml-14 bg-zinc-900 shadow-2xl p-6 border rounded-lg relative">
              <p className="pb-6">Expense Chart</p>
              <div className="border border-gray-200">
                {expenseData && incomeData ? (
                  <AllTransactionsChart
                    expenses={expenseData}
                    incomes={incomeData}
                  />
                ) : (
                  <div className="text-green-300">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>

            <div className="text-gray-200 mt-14 ml-10 mr-14 border shadow-2xl rounded-lg w-3/6 h-96 space-y-1">
              <div>
                <p className="pt-5">Latest Expenses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
