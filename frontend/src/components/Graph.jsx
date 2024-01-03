import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  const data = {};
  const config = {
    data: {
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return (
    <div className="flex text-justify w-[25%] ">
      <div className="">
        <div className=" flex flex-col justify-center items-center ">
          <Doughnut {...config}></Doughnut>
          <div className="flex items-center justify-center">
            <h3 className="mb-4 font-bold ">Total : 1000 </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
