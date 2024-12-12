import React from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import Chart from "../../Chart/chart";
import AllTransactionsChart from "../../components/Charts/AllTransactionsChart";
import { useGetAllExpensesQuery } from "../../modules/expenses/expensesApiSlice";
import { useGetAllIncoemsQuery } from "../../modules/incomes/incomesApiSlice";

const Dashboard: React.FC = () => {
  const { data: expenseData } = useGetAllExpensesQuery();
  const { data: incomeData } = useGetAllIncoemsQuery();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-Darkgrayishviolet ">
        <div className="flex">
          <Sidebar />
          <div className="flex-grow relative">
            <i className="absolute top-0 right-0 p-6">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "380px", height: "60px" }}
              />
            </i>
            <div className="absolute top-36 left-14 w-1/4 h-96">
              <Chart />
              {expenseData && incomeData ? (
                <AllTransactionsChart
                  expenses={expenseData}
                  incomes={incomeData}
                />
              ) : (
                <h2>Loading</h2>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
