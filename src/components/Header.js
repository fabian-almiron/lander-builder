import React from "react";

const Header = ({ clientName, url, onToggleAccountMenu }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow ">
      <div>
        <h1 className="text-xl font-bold">{clientName}</h1>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {url}
        </a>
      </div>
      <button onClick={onToggleAccountMenu} className="text-gray-600 hover:text-gray-800">
        Account
      </button>
    </header>
  );
};

export default Header;