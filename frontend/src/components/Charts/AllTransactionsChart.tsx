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
  Colors,
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
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(225, 29, 72)");
          gradient.addColorStop(1, "rgba(224, 92, 92,0.4)");
          return gradient;
        },
        borderColor: "rgb(225, 29, 72)",
      },

      {
        label: "Incomes",
        data: dates.map((date) => incomesMap.get(date) || 0),
        fill: true,
        tension: 0.4,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(103, 236, 58, 0.8)");
          gradient.addColorStop(1, "rgba(219, 239, 212,0.4)");
          return gradient;
        },
        borderColor: "rgb(103, 236, 58)",
      },
    ],
  };
  return <Line data={data}></Line>;
};

export default AllTransactionsChart;
