import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = ({ budgetAmount, totalExpenseAmount }) => {
  const data = {
    labels: ["Budget", "Total Expense"],
    datasets: [
      {
        data: [budgetAmount, totalExpenseAmount],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(232, 23, 39)"],
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 10,
        label: "Budget vs Expense",
      },
    ],
  };

  const options = {
    cutout: 115,
  };
  return (
    <div className="flex text-justify w-[25%] ">
      <div className="">
        <div className=" flex flex-col justify-center items-center ">
          <Doughnut data={data} options={options} />
          <div className="flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
