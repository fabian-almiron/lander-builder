import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AccountMenu from "./AccountMenu";

const Dashboard = ({ onLogout, children, clientName, url }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = () => setShowAccountMenu((prev) => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 ml-64 overflow-y-auto w-full">
        <Header clientName={clientName} url={url} onToggleAccountMenu={toggleAccountMenu} />
        {showAccountMenu && <AccountMenu onLogout={handleLogout} />}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;