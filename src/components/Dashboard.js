import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AccountMenu from "./AccountMenu";



const Dashboard = ({ onLogout, children }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = () => setShowAccountMenu((prev) => !prev);

  return (
    <div className="flex h-screen">
      <Sidebar>
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
      </Sidebar>
      <div className="flex-1 bg-gray-100 relative">
        <Header onToggleAccountMenu={toggleAccountMenu} />
        {showAccountMenu && <AccountMenu onLogout={onLogout} />}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;