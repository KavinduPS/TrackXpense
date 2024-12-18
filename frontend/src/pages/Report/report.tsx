import React, { useMemo } from "react";
import logo from "../../assets/trackxpense_logo.png";
import Sidebar from "../../components/Sidebar";
import Spinner from "../../components/Spin";
import {
  useGetAllExpensesByDateQuery,
  useGetAllExpensesQuery,
} from "../../modules/expenses/expensesApiSlice";
import {
  useGetAllIncoemsQuery,
  useGetAllIncomesByDateQuery,
} from "../../modules/incomes/incomesApiSlice";
import AllTransactionsChart from "../../components/Charts/AllTransactionsChart";
import { Expense, Income } from "../../types";
import CategoryChart from "../../components/Charts/ReportCharts/CategoryChart";

const Report: React.FC = () => {
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
    <div className="flex flex-col min-h-screen bg-zinc-900 ">
      <div className="flex fixed">
        <Sidebar />
      </div>
      <div className="flex pl-80">
        <div className="flex-grow  ">
          <i className="absolute top-0 right-0 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </i>

          <div className="flex justify-between w-full">
            <div className="w-3/6 text-gray-200 mt-28 ml-14 bg-zinc-900 shadow-2xl">
              <div className="w-full border border-gray-200 rounded-lg p-5 ">
                <p className="pb-6">Expense Chart</p>
                {expenseData && incomeData ? (
                  <AllTransactionsChart
                    expenses={expenseData}
                    incomes={incomeData}
                  />
                ) : (
                  <h2>
                    <Spinner />
                  </h2>
                )}
              </div>

              <div className="w-full h-2/5 border border-gray-200 rounded-lg mt-10 flex justify-center items-center ">
                <CategoryChart />
              </div>
            </div>

            <div className="text-gray-200 mt-28 mr-14 shadow-2xl rounded-lg w-2/5 ">
              <div className="space-y-12 ">
                <div className="  flex-col gap-1 ml-6 border border-gray-200 rounded-xl h-44 flex justify-center items-center ">
                  <p className="text-2xl font-semibold text-gray-200">
                    Total Income
                  </p>
                  <p className="text-4xl font-semibold text-green-400">
                    LKR: {isIncomesLoading ? <Spinner /> : totalIncomes}
                  </p>
                </div>
                <div className=" flex flex-col gap-1 ml-6 border border-gray-200 rounded-xl h-44 justify-center items-center">
                  <p className="text-2xl font-semibold text-gray-200">
                    Total Expense
                  </p>
                  <p className="text-4xl font-semibold text-red-400">
                    LKR: {isExpensesLoading ? <Spinner /> : totalExpenses}
                  </p>
                </div>

                <div className=" flex flex-col gap-1  ml-6 border border-gray-200 rounded-xl h-44 justify-center items-center">
                  <p className="text-2xl font-semibold text-gray-200">
                    Total Balance
                  </p>
                  <p className="text-4xl font-semibold text-yellow-400">
                    LKR: {totalIncomes - totalExpenses}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
