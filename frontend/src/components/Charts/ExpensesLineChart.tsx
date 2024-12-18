import React, { ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { Expense } from "../../types";

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
      },
    ],
  };
  return <Line data={data}></Line>;
};

export default ExpensesLineChart;
