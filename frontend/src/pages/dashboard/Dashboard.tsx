import React from 'react';
import Sidebar from '../../components/Sidebar';
import logo from "../../assets/trackxpense_logo.png";

const Dashboard: React.FC = () => {
  return (
    <><div className="flex flex-col min-h-screen bg-zinc-600 text-white">
    <div className="flex">
      <Sidebar/>
      <div className="flex-grow relative">
        <i className="absolute top-0 right-6 m-4">
          <img src={logo} alt="Logo" style={{ width: '380px', height: '80px' }} />
        </i>
      </div>
    </div>
  </div>
  </>
    
  );
};

export default Dashboard;
