import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Admin from "../assets/admin.png";

const Sidebar: React.FC = () => {
  return (
    <div className=" bg-Darkgrayishviolet w-72 h-5/6 flex flex-col items-center py-5 rounded-xl border border-gray-400 mt-12 ml-12">
      <div className="h-20 w-20 flex items-center justify-center mb-20">
        <i className="text-gray-400 text-2xl relative top-7">
          <img src={Admin} alt="Admin Logo" />
        </i>
      </div>
      <nav className="text-gray-200 w-full relative top-15 ">
        <ul>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/income">Income</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/goals">Goals</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/reports">Reports</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-12 py-6 bg-Darkgrayishviolet hover:bg-orange-200 text-xl hover:text-Darkgrayishviolet">
            <Link to="/profile">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
