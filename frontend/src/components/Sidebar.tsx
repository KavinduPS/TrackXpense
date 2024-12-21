import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Admin from "../assets/admin.png";
import { useLogoutMutation } from "../modules/users/usersApiSlice";
import { AuthState, logoutUser } from "../modules/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

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
    { path: "/about", label: "About Us" },
    { path: "/profile", label: "Settings" },
  ];

  return (
    <div className="bg-Darkgrayishviolet w-[260px] h-[635px] flex flex-col items-center py-5 rounded-xl border border-gray-200 mt-14 ml-12">
      <div className="flex items-center justify-center mt-4">
        <img src={Admin} alt="Admin Logo" className="h-28 w-28" />
      </div>

      <nav className="text-gray-200 w-full mt-5">
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className={`px-12 py-6 text-xl cursor-pointer h-16 flex justify-center items-center ${
                location.pathname === link.path
                  ? "bg-orange-200 text-zinc-900"
                  : "bg-zinc-900 hover:bg-orange-200 hover:text-zinc-900"
              }`}
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
          <li
            onClick={handleLogout}
            className="px-12 py-6 bg-zinc-900 hover:bg-orange-200 text-xl hover:text-zinc-900 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
