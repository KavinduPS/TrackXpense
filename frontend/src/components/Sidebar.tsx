import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Admin from "../assets/admin2.png";
import { useLogoutMutation } from "../modules/users/usersApiSlice";
import { AuthState, logoutUser } from "../modules/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../modules/api/apiSlice";

interface RootState {
  auth: AuthState;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout(user).unwrap();
      dispatch(apiSlice.util.resetApiState());
      dispatch(logoutUser({}));
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/income", label: "Income" },
    { path: "/expenses", label: "Expenses" },
    { path: "/goals", label: "Goals" },
    { path: "/reports", label: "Reports" },
    { path: "/about", label: "About Us" },
    { path: "/profile", label: "Settings" },
  ];

  return (
    <div className=" bg-zinc-900 w-72 h-3/5 flex flex-col items-center py-5 rounded-xl border border-gray-400 mt-12 ml-12">
      <div className="h-20 w-20 flex items-center justify-center mb-20">
        <i className="text-gray-400 text-2xl relative top-7">
          <img src={Admin} alt="Admin Logo" />
        </i>
      </div>
      <nav className="text-gray-200 w-full relative ">
        <ul>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/income">Income</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/goals">Goals</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/report">Reports</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900">
            <Link to="/profile">Settings</Link>
          </li>
          <li
            onClick={handleLogout}
            className="px-12 py-5 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900"
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
