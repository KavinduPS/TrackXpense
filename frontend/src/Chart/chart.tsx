import React from "react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartStyled = styled.div`
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 20px;
  height: 85%;
  width: 170%;
`;

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Income",
      data: [2000, 4000, 3000, 5000, 7000, 6000, 3500],
      borderColor: "rgb(103, 236, 58)",
      borderWidth: 1,
      pointBackgroundColor: "rgb(103, 236, 58)",
      pointRadius: 2,

      backgroundColor: (context: any) => {
        const chart = context.chart;
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;

        if (!chartArea) {
          return;
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom
        );

        gradient.addColorStop(0, "rgba(103, 236, 58, 0.5)");
        gradient.addColorStop(1, "rgba(53, 47, 68, 0.3)");

        return gradient;
      },
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#D7D7D7",
      },
    },
    title: {
      display: true,
      text: "Income Chart",
      font: {
        size: 20,
        family: "Arial",
        weight: "bold" as "bold",
      },
      color: "#D9D9D9",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#D9D9D9",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#D9D9D9",
      },
    },
  },
};

function Chart() {
  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
}

export default Chart;
