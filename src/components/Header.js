import React from "react";

const Header = ({ onToggleAccountMenu }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>
      <div
        className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={onToggleAccountMenu}
      >
        <span className="font-bold">U</span>
      </div>
    </header>
  );
};

export default Header;
