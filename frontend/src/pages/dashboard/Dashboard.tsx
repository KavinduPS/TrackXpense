import React from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import AllTransactionsChart from "../../components/Charts/AllTransactionsChart";
import { useGetAllExpensesByDateQuery } from "../../modules/expenses/expensesApiSlice";
import { useGetAllIncomesByDateQuery } from "../../modules/incomes/incomesApiSlice";

const Dashboard: React.FC = () => {
  const { data: expenseData } = useGetAllExpensesByDateQuery();
  const { data: incomeData } = useGetAllIncomesByDateQuery();
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
      </div>
    </>
  );
};

export default Dashboard;
