import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const data = {
    labels: [
      "Housing",
      "Insurance",
      "Groceries",
      "Electricity",
      "Clothing",
      "Entertainment",
      "Other",
    ],
    datasets: [
      {
        label: "",
        data: [300, 250, 600, 345, 134, 800, 700],
        backgroundColor: [
          "rgb(248, 113, 113)",
          "rgb(252, 211, 77)",
          "rgb(118, 214, 46)",
          "rgb(54, 184, 199)",
          "rgb(67, 56, 202)",
          "rgb(168, 85, 247)",
          "rgb(225, 29, 72)",
        ],
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          boxWidth: 30,
          boxHeight: 15,
          padding: 15,
          font: {
            size: 20,
          },
          color: "#F7F7F7",
        },
      },
    },
  };

  return (
    <div style={{ width: "450px", height: "450px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CategoryChart;
