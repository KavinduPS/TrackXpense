// import { AggExpense } from "../../types";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { useMemo } from "react";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// type ExpensesChartProps = { expenses: AggExpense[] };

// const ExpensesChart = ({ expenses }: ExpensesChartProps) => {
//   const chartData = useMemo(() => {
//     const sortedDates = [...expenses].sort(
//       (a, b) =>
//         new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()
//     );

//     const dates = sortedDates.map((income) =>
//       new Date(income.originalDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       })
//     );

//     const amounts = sortedDates.map((income) => income.amount);

//     return {
//       labels: dates,
//       datasets: [
//         {
//           label: "Expense",
//           data: amounts,
//           fill: true,
//           tension: 0.4,
//           borderColor: "rgb(255, 165, 1, 0.2)",
//           backgroundColor: "rgba(255,165,0)",
//           borderWidth: 2,
//         },
//       ],
//     };
//   }, [expenses]);

//   const options = {
//     elements: {
//       point: {
//         radius: 0.2,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },

//       y: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   return (
//     <div className="px-5" style={{ width: "670px", height: "350px" }}>
//       <Line data={chartData} options={options}></Line>
//     </div>
//   );
// };

// export default ExpensesChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";

type ExpensesChartProps = {
  expenses: { originalDate: string; amount: number }[];
};

const ExpensesChart = ({ expenses }: ExpensesChartProps) => {
  // Sort and format the data
  const sortedExpenses = [...expenses].sort(
    (a, b) =>
      new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()
  );

  const data = sortedExpenses.map((expense) => ({
    date: new Date(expense.originalDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: expense.amount,
  }));

  return (
    <div className=" pr-5 h-[350px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="red" stopOpacity={0.5} />
              <stop offset="100%" stopColor="yellow" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingBottom: 10,
              paddingLeft: 26,
            }}
            iconType="rect"
            iconSize={14}
            formatter={(value) => <span style={{ color: "red" }}>{value}</span>}
          />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="red"
            strokeWidth={2}
            fill="url(#areaGradient)"
            name="Expenses"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
