import { AggExpense, AggIncome } from "../../types";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";

type AccountBalanceChartProps = {
  expenses: AggExpense[];
  incomes: AggIncome[];
};

const AccountBalanceChart = ({
  expenses,
  incomes,
}: AccountBalanceChartProps) => {
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

  let runningBalance = 0;
  const data = dates.map((date) => {
    const income = incomesMap.get(date) || 0;
    const expense = expensesMap.get(date) || 0;
    runningBalance += income - expense;
    return { date: formatedDates[dates.indexOf(date)], amount: runningBalance };
  });

  return (
    <div className=" pr-5 h-[230px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#00FF40" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#4FFFB0" stopOpacity={1} />
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
              <span style={{ color: "#4FFFB0" }}>{value}</span>
            )}
          />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#4FFFB0"
            strokeWidth={2}
            fill="url(#areaGradient)"
            name="Balance"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountBalanceChart;
