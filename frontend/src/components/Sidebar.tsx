import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../modules/auth/authApiSlice";
import { clearUser } from "../modules/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../State/store";
import { apiSlice } from "../modules/api/apiSlice";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout(user).unwrap();
      dispatch(clearUser());
      dispatch(apiSlice.util.resetApiState());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/incomes", label: "Income" },
    { path: "/expenses", label: "Expenses" },
    { path: "/goals", label: "Goals" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 bg-Dark w-[260px] h-[635px] flex flex-col items-center py-5 rounded-xl ml-12">
      <div className="flex items-center justify-center mt-4 w-28 h-28 text-gray-200 bg-zinc-900 rounded-full text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500">
        {user?.name.slice(0, 1)}
      </div>
      <h2 className="mt-4 text-xl text-gray-200">{user?.name.split(" ")[0]}</h2>

      <nav className="text-gray-200 w-full mt-8 space-y-2">
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className={`px-12 py-6 text-xl cursor-pointer h-16 flex justify-center items-center  ${
                location.pathname === link.path
                  ? "bg-orange-200 text-zinc-900"
                  : "bg-Dark hover:bg-orange-200 hover:text-zinc-900"
              }`}
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
          <li
            onClick={handleLogout}
            className="px-12 py-6 h-16 bg-Dark hover:bg-orange-200 text-xl hover:text-zinc-900 cursor-pointer flex justify-center items-center"
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
