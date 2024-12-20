import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AggExpenseByMonth, AggIncomeByMonth } from "../../types";
import { combineFinancialData } from "../../utils/dateUtils";
import Incomes from "../../pages/income/page";

type IncomeExpenseBarChartProps = {
  incomes: AggIncomeByMonth[];
  expenses: AggExpenseByMonth[];
};

const IncomeExpenseBarChart = ({
  incomes,
  expenses,
}: IncomeExpenseBarChartProps) => {
  const data = combineFinancialData(expenses, incomes);
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#4caf50" name="Income" />
        <Bar dataKey="expense" fill="#f44336" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseBarChart;
