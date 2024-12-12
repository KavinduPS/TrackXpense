import React from "react";
import { Expense, Income } from "../../types";
import { Line } from "react-chartjs-2";

type AllTransactionsChartProps = {
  expenses: Expense[];
  incomes: Income[];
};

const AllTransactionsChart = ({
  expenses,
  incomes,
}: AllTransactionsChartProps) => {
  const data = {
    labels: expenses.map((expense) => expense.date),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        fill: true,
        tension: 0.4,
      },

      {
        label: "Incomes",
        data: incomes.map((income) => income.amount),
        fill: true,
        tension: 0.4,
      },
    ],
  };
  return <Line data={data}></Line>;
};

export default AllTransactionsChart;
