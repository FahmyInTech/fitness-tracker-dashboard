import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartColumn,
  faChartLine,
  faCalendarAlt,
  faUsers,
  faTrophy,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import logo from '../images/logo 1.png';
import sidebarImg from '../images/f37dce61c50136e8f7ee1f5fc46d47db-removebg-preview 1.png';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Schedule");

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
      className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer text-base font-medium transition w-full ${
        activeItem === name
          ? "bg-[#4ec7a8] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveItem(name)}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`w-5 h-5 transition ${
          activeItem === name ? "text-white" : "text-gray-400"
        }`}
      />
      <span>{name}</span>
    </li>
  );

  return (
    <div className="fixed z-20 top-0 left-0 h-full w-[308px] bg-[rgba(217,217,217,0.32)] shadow-sm border flex flex-col justify-between md:flex">
      {/* Top: Logo and PrimeFit */}
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex items-center gap-3 px-8">
          <img src={logo} alt="Primefit logo" className="w-12 h-12" />
          <span
            className="font-inter font-normal text-[27px] leading-[33px] text-[#329D7F]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            PrimeFit
          </span>
        </div>
        {/* Nav Tabs */}
        <ul className="flex flex-col gap-2 px-8">
          {navItems.map(renderItem)}
        </ul>
        {/* Manage Section */}
        <div className="mt-6 px-8">
          <span className="text-base font-black mb-2 block">Manage</span>
          <ul className="flex flex-col gap-2">{manageItems.map(renderItem)}</ul>
        </div>
      </div>
      {/* Bottom image absolutely positioned */}
      <img src={sidebarImg} alt="Sidebar Illustration" style={{ position: 'absolute', left: '38px', bottom: '32px', width: '201px', height: '201px' }} />
    </div>
  );
};

export default Sidebar;
