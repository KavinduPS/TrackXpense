// import { AggIncome } from "../../types";
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

// type IncomesChartProps = {
//   incomes: AggIncome[];
// };

// const IncomesChart = ({ incomes }: IncomesChartProps) => {
//   const chartData = useMemo(() => {
//     const sortedDates = [...incomes].sort(
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
//           label: "Income",
//           data: amounts,
//           fill: true,
//           tension: 0.4,
//           borderColor: "rgb(100, 250, 50)",
//           backgroundColor: "rgba(100, 250, 50, 0.3)",
//           borderWidth: 2,
//         },
//       ],
//     };
//   }, [incomes]);

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
//   console.log(chartData);
//   return (
//     <div className="px-5" style={{ width: "670px", height: "350px" }}>
//       <Line data={chartData} options={options}></Line>
//     </div>
//   );
// };

// export default IncomesChart;

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

type IncomesChartProps = {
  incomes: { originalDate: string; amount: number }[];
};

const IncomesChart = ({ incomes }: IncomesChartProps) => {
  // Sort and format the data
  const sortedExpenses = [...incomes].sort(
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
              <stop offset="10%" stopColor="green" stopOpacity={0.5} />
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
            formatter={(value) => (
              <span style={{ color: "green" }}>{value}</span>
            )}
          />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="green"
            strokeWidth={2}
            fill="url(#areaGradient)"
            name="Incomes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomesChart;
