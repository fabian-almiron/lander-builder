import React from "react";

const AccountMenu = ({ onLogout }) => {
  return (
    <div className="absolute top-14 right-4 bg-white shadow-md rounded-lg p-4 w-48">
      <ul>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => alert("My Account Section")}
        >
          My Account
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={onLogout}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
