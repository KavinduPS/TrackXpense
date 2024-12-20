import React, { ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { Expense } from "../../types";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type ExpensesLineChartProps = {
  expensesData: Expense[];
};

const ExpensesLineChart = ({
  expensesData,
}: ExpensesLineChartProps): ReactElement => {
  const data = {
    labels: expensesData.map((expense) => expense.date),
    datasets: [
      {
        label: "Expenses Data",
        data: expensesData.map((expense) => expense.amount),
        fill: true,
        borderColor: "rgb(103, 236, 58)",
        borderWidth: 1,
        pointBackgroundColor: "rgb(103, 236, 58)",
        pointRadius: 2,
        tension: 0.4,
        backgroundColor: "rgba(103, 236, 58, 0.3)",
      },
    ],
  };
  return <Line data={data}></Line>;
};

export default ExpensesLineChart;
