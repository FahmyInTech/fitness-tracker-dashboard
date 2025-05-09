 import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom"; 
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
     <div
        className={`fixed z-50 top-0 left-0 h-full w-58 transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <Sidebar />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Navbar />
        <button
          className="lg:hidden m-4 w-fit self-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-[#329D7F] "/>
        </button>


        <main className={`p-4 overflow-y-auto flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;