import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Dashboard = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Call parent function to update login state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar can be imported and used here */}
      <div className="w-64 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold p-4">Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-400"
          >
            Logout
          </button>
        </header>
        <main className="p-6">
          <p>This is where your dashboard content will go.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
