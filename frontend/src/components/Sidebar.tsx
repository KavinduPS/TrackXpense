import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import Admin from '../assets/admin.png';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-zinc-800 w-1/4 flex flex-col items-center py-5">
      <div className="h-20 w-20 flex items-center justify-center mb-20">
        <i className="text-white text-2xl relative top-7">
          <img src={Admin} alt="Admin Logo" />
        </i>
      </div>
      <nav className="text-white w-full relative top-15">
        <ul>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/income">Income</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/goals">Goals</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/reports">Reports</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="px-12 py-6 bg-gray-700 hover:bg-orange-200 text-xl">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
