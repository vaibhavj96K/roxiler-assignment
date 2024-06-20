import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, selectedMonth }) => {
  const dataa = data.barChart;

  if (dataa) {
    dataa.sort((a, b) => {
      let numA = parseInt(a.priceRange.split("-")[0]);
      let numB = parseInt(b.priceRange.split("-")[0]);

      return numA - numB;
    });

    const chartData = {
      labels: dataa.map((item) => item.priceRange),
      datasets: [
        {
          label: "Count",
          data: dataa.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: `Bar chart stats ${selectedMonth}`,
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <div className="w-[900px] h-96 p-4 bg-white rounded-lg shadow-md flex justify-center items-center">
        <Bar data={chartData} options={options} />
      </div>
    );
  }
};

export default Chart;
