import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed z-50 top-0 left-0 h-full w-58 bg-white transition-transform duration-300 transform
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <Sidebar />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col  overflow-hidden">
    
        <Navbar />
        <button
          className="lg:hidden m-4 w-fit self-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-[#329D7F]" />
        </button>

        <main className="p-4 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
