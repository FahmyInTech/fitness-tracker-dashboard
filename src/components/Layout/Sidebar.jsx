import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faChartLine,
  faCalendarAlt,
  faUsers,
  faTrophy,
  faCog,
  faQuestionCircle,
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/27224a48a19344a6cd209bee0a7612a80ef531c0 (1).png";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Progress");
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const navItems = [
    { name: "Dashboard", icon: faChartColumn },
    { name: "Progress", icon: faChartLine },
    { name: "Schedule", icon: faCalendarAlt },
    { name: "Community", icon: faUsers },
    { name: "Achievements", icon: faTrophy },
  ];

  const manageItems = [
    { name: "Setting", icon: faCog },
    { name: "Help", icon: faQuestionCircle },
  ];

  const renderItem = ({ name, icon }) => (
    <li
      key={name}
      className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition ${
        activeItem === name
          ? "bg-[#329D7F] text-white"
          : isDarkMode
          ? "text-gray-300 hover:bg-gray-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => {
        setActiveItem(name);
        navigate(`/${name.toLowerCase()}`);
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`w-4 h-4 transition ${
          activeItem === name ? "text-white" : isDarkMode ? "text-gray-400" : "text-gray-400"
        }`}
      />
      <span>{name}</span>
    </li>
  );

 
  // useEffect(() => {

  // }, [isDarkMode]);

  return (
    <div className={`w-58 h-screen shadow-sm p-4 flex flex-col justify-between border ${
      isDarkMode ? "bg-gray-800 dark:border-gray-700" : "bg-[#D9D9D952] border-gray-200"
    }`}>
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <img src={logo} alt="Primefit logo" className="w-12 h-12" />
          <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#329D7F]"}`}>
            PrimeFit
          </h2>
        </div>

        <ul className="space-y-2">{navItems.map(renderItem)}</ul>

        <div className="mt-8">
          <span className={`text-l font-black px-4 mb-2 block ${isDarkMode ? "text-white" : ""}`}>
            Manage
          </span>
          <ul className="space-y-1">{manageItems.map(renderItem)}</ul>
        </div>
      </div>

      
      <div className="flex items-center justify-between px-4 mt-4">
        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${
            isDarkMode 
              ? "text-yellow-400 hover:text-white" 
              : "text-gray-600 hover:text-[#329D7F]"
          }`}
        >
          <FontAwesomeIcon 
            icon={isDarkMode ? faSun : faMoon} 
            className="w-5 h-5" 
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;