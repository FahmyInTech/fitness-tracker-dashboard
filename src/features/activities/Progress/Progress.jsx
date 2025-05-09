import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Progress.css";
import LineCharts from "./LineCharts";
import PieChartComponent from "./PieChart";
import MonthGoals from "./MonthGoals";
import RecentAct from "./RecentAct";
import { selectActiveTab, setActiveTab } from "../../../redux/progressSlice";
import { useTheme } from "../../../context/ThemeContext"; 

const Progress = () => {
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const tabs = ["Day", "Week", "Month"];

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className={`mt-3 px-8 ${isDarkMode ? "text-white" : ""}`}>
      <p>
        <span className={isDarkMode ? "text-gray-400 pr-2" : "text-[#696767] pr-2"}>MainMenu</span> &gt;{" "}
        <span className="pl-2 font-medium">Progress</span>
      </p>

      <div className="flex justify-between flex-wrap progress">
        <div>
          <h2>Progress</h2>
          <p className={isDarkMode ? "text-white -mt-px" : "text-[#696767] -mt-px"}>
            Monitor your fitness progress
          </p>
        </div>
        <div className="flex flex-wrap">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer px-4 py-2 rounded-full transition ${
                  activeTab === tab 
                    ? "bg-[#329D7F9C] text-white" 
                    : isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </div>
      </div>

      <div className="flex flex-wrap mt-9 -mx-2">
        <div className="w-full md:w-1/2 lg:w-2/3 px-2 mb-4">
          <div className={`rounded-xl lg:p-5 h-full ${
            isDarkMode 
              ? "border border-gray-700 bg-gray-800" 
              : "border border-[#00000040]"
          }`}>
            <LineCharts />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <div className={`rounded-xl md:p-5 lg:p-5 h-full ${
            isDarkMode 
              ? "border border-gray-700 bg-gray-800" 
              : "border border-[#00000040]"
          }`}>
            <PieChartComponent />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mt-9">
        <div className="w-full md:w-1/2 lg:w-2/5 p-2 mb-4">
          <div className={`rounded-xl h-full ${
            isDarkMode 
              ? "border border-gray-700 bg-gray-800" 
              : "border border-[#00000040]"
          }`}>
            <MonthGoals />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-3/5 p-2 mb-4">
          <div className={`rounded-xl p-3 h-full ${
            isDarkMode 
              ? "border border-gray-700 bg-gray-800" 
              : "border border-[#00000040]"
          }`}>
            <RecentAct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;