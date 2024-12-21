import { AggExpense } from "../../types";
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
import { useMemo } from "react";
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

type ExpensesChartProps = { expenses: AggExpense[] };

const ExpensesChart = ({ expenses }: ExpensesChartProps) => {
  const chartData = useMemo(() => {
    const sortedDates = [...expenses].sort(
      (a, b) =>
        new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()
    );

    const dates = sortedDates.map((income) =>
      new Date(income.originalDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

    const amounts = sortedDates.map((income) => income.amount);

    return {
      labels: dates,
      datasets: [
        {
          label: "Income",
          data: amounts,
          fill: true,
          tension: 0.4,
          borderColor: "rgb(100, 250, 50)",
          backgroundColor: "rgba(100, 250, 50, 0.3)",
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

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

  return (
    <div style={{ width: "465px", height: "465px" }}>
      <Line data={chartData} options={options}></Line>
    </div>
  );
};

export default ExpensesChart;
