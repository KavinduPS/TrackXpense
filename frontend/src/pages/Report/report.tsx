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

          <div className="flex justify-between space-x-10 mr-12 mb-20">
            <div className="w-full mt-28 ml-14 space-y-8 ">
              <div className="shadow-2xl bg-Dark rounded-xl h-1/2">
                {expenseData && incomeData ? (
                  <AllTransactionsChart
                    expenses={expenseData}
                    incomes={incomeData}
                  />
                ) : (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center shadow-2xl h-1/2 bg-Dark rounded-xl">
                <CategoryChart />
              </div>
            </div>
            <div className="w-full mt-28 space-y-14 flex flex-col  items-end">
              <div className="w-10/12 h-48 flex justify-center items-center shadow-2xl rounded-xl bg-Dark ">
                <div className=" flex flex-col  gap-1  ml-6">
                  <p className="text-2xl font-semibold text-gray-200">
                    Total Income
                  </p>
                  <p className="text-4xl font-semibold text-green-400">
                    LKR: {isIncomesLoading ? <Spinner /> : totalIncomes}
                  </p>
                </div>
              </div>
              <div className="w-10/12 h-48 flex justify-center items-center shadow-2xl rounded-xl bg-Dark">
                <div className=" flex flex-col   gap-1 ml-6">
                  <p className="text-2xl font-semibold text-gray-200">
                    Total Expense
                  </p>
                  <p className="text-4xl font-semibold text-red-400">
                    LKR: {isExpensesLoading ? <Spinner /> : totalExpenses}
                  </p>
                </div>
              </div>
              <div className="w-10/12 h-48 flex justify-center items-center shadow-2xl rounded-xl bg-Dark">
                <div className=" flex flex-col gap-1  ml-6">
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
