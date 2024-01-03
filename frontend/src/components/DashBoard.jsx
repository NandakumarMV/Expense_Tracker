import React from "react";
import Graph from "./Graph";

const DashBoard = () => {
  return (
    <div className=" flex flex-col space-x-5 justify-center items-center">
      <div className="">
        <Graph />
      </div>
      <div className=" flex space-x-8">
        <div className="bg-white border-2 border-slate-200 shadow-xl  flex items-center justify-center text-3xl h-20 p-4">
          Total Expense
        </div>
        <div className="bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center text-3xl h-20 p-4">
          Total Budget
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
