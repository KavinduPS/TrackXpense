import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CategoryExpenses } from "../../../types";

type CategoryChartProps = {
  expenses: CategoryExpenses[];
};

const CategoryChart = ({ expenses }: CategoryChartProps) => {
  const COLORS = [
    "#f87171",
    "#a3e635",
    "#f97316",
    "#fbbf24",
    "#a855f7",
    "#5eead4",
    "#6366f1",
    "#f43f5e",
    "#3cb371",
  ];

  const data = expenses.map((expense) => {
    return { name: expense._id, value: expense.totalAmount };
  });

  const filteredData = data.filter((expense) => expense.value > 0);

  const chartColors = COLORS.slice(0, filteredData.length);

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
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;
