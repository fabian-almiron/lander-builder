import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold p-4">
          <Logo className="w-6 h-6 mr-2" />
          Lander Builder
        </h1>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/">Landing Pages</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/forms">Forms</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">U</span>
          </div>
          <span className="ml-2">User</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;