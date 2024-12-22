import { AggExpense, AggIncome } from "../../types";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  const cumulativeBalance = dates.map((date) => {
    const income = incomesMap.get(date) || 0;
    const expense = expensesMap.get(date) || 0;
    runningBalance += income - expense;
    return runningBalance;
  });

  const options = {
    elements: {
      point: {
        radius: 0.2,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: formatedDates,
    datasets: [
      {
        label: "Account Balance",
        data: cumulativeBalance,
        fill: true,
        tension: 0.4,
        backgroundColor: "rgb(100, 250, 50, 0.3)",
      },
    ],
  };
  console.log(data.datasets);

  return (
    <div style={{ width: "465px", height: "465px" }}>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default AccountBalanceChart;
