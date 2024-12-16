import React from "react";
import { AggExpense, AggIncome } from "../../types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type AllTransactionsChartProps = {
  expenses: AggExpense[];
  incomes: AggIncome[];
};

const AllTransactionsChart = ({
  expenses,
  incomes,
}: AllTransactionsChartProps) => {
  const dates = Array.from(
    new Set(
      [
        ...expenses.map((e) => e.originalDate),
        ...incomes.map((i) => i.originalDate),
      ].sort()
    )
  );

  const formatedDates = dates.map((date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  console.log(formatedDates);

  const expensesMap = new Map(
    expenses.map((expense) => [expense.originalDate, expense.amount])
  );

  const incomesMap = new Map(
    incomes.map((income) => [income.originalDate, income.amount])
  );

  const data = {
    labels: formatedDates,
    datasets: [
      {
        label: "Expenses",
        data: dates.map((date) => expensesMap.get(date) || 0),
        fill: true,
        tension: 0.4,
      },

      {
        label: "Incomes",
        data: dates.map((date) => incomesMap.get(date) || 0),
        fill: true,
        tension: 0.4,
      },
    ],
  };
  console.log(data.datasets);
  return <Line data={data}></Line>;
};

export default AllTransactionsChart;
