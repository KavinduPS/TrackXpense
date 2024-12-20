// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const CategoryChart = () => {
//   const data = {
//     labels: [
//       "Housing",
//       "Insurance",
//       "Groceries",
//       "Electricity",
//       "Clothing",
//       "Entertainment",
//       "Other",
//     ],
//     datasets: [
//       {
//         label: "",
//         data: [300, 250, 600, 345, 134, 800, 700],
//         backgroundColor: [
//           "rgb(248, 113, 113)",
//           "rgb(252, 211, 77)",
//           "rgb(118, 214, 46)",
//           "rgb(54, 184, 199)",
//           "rgb(67, 56, 202)",
//           "rgb(168, 85, 247)",
//           "rgb(225, 29, 72)",
//         ],
//       },
//     ],
//   };

//   const options = {
//     cutout: "70%",
//     plugins: {
//       legend: {
//         display: true,
//         position: "right" as const,
//         labels: {
//           boxWidth: 30,
//           boxHeight: 15,
//           padding: 15,
//           font: {
//             size: 15,
//           },
//           color: "#F7F7F7",
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: "340px", height: "340px" }}>
//       <Doughnut data={data} options={options} />
//     </div>
//   );
// };

// export default CategoryChart;

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Housing", value: 75000 },
  { name: "Insurance", value: 54000 },
  { name: "Groceries", value: 54000 },
  { name: "Electricity", value: 54000 },
  { name: "Clothing", value: 54000 },
  { name: "Entertainment", value: 54000 },
  { name: "Other", value: 54000 },
];

const COLORS = [
  "#f87171",
  "#a3e635",
  "#f97316",
  "#fbbf24",
  "#a855f7",
  "#5eead4",
  "#6366f1",
  "#f43f5e",
]; // Colors for income and expense

const CategoryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={120}
          fill="#8774d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;
