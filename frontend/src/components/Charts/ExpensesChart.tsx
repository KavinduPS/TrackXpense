import {
  XAxis,
  YAxis,
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
