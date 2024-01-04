import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import DashBoard from "./DashBoard";
import Expenses from "./Expenses";

const SideBar = () => {
  const [content, setContent] = useState("Dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const changeContent = (newContent) => {
    setActiveMenuItem(newContent);
    setContent(newContent);
  };
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col lg:flex-row items-start h-[35rem]">
      <div className="bg-slate-100 w-full lg:w-[20%] rounded-2xl flex flex-col justify-start items-center space-y-3 p-5 h-[35rem] shadow-xl border-2 border-slate-300">
        <div>
          <FaUserCircle className="h-14 w-14" />
        </div>
        <div className="text-lg flex flex-col items-center text-slate-950 font-mono font-medium">
          <p>{userInfo.name}</p>
          <p className="text-base">{userInfo.email}</p>
        </div>
        <div>
          <ul className="mt-4">
            <li
              className={`py-2 hover:bg-gray-200 pl-4 ${
                activeMenuItem === "Dashboard"
                  ? "underline underline-offset-4 text-blue-900 text-lg font-medium"
                  : ""
              }`}
              onClick={() => changeContent("Dashboard")}
            >
              DashBoard
            </li>
            <li
              className={`py-2 hover:bg-gray-200 pl-4 ${
                activeMenuItem === "expense"
                  ? "underline underline-offset-4 text-blue-900 text-lg font-medium"
                  : ""
              }`}
              onClick={() => changeContent("expense")}
            >
              Expense
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-200 mt-4 lg:mt-0 lg:ml-4 w-full lg:w-[70%] rounded-2xl flex flex-col justify-start items-center space-y-3 p-5 h-[35rem] shadow-xl border-2 border-slate-300">
        {content === "Dashboard" && <DashBoard />}
        {content === "expense" && <Expenses />}
      </div>
    </div>
  );
};

export default SideBar;
