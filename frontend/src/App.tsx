import React from "react";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/page";
import Income from "./pages/income/page";
import Goals from "./pages/Goals/Goals";
import Settings from "./pages/Settting/setting";
import ForgotPassword from "./pages/ForgotPassword/forgotpassword";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckEmail from "./pages/ForgotPassword/Checkemail";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          //Private routes
          <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/expenses" element={<Expenses />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/incomes" element={<Income />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/goals" element={<Goals />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route
            path="/reset-password/:token/:user"
            element={<ForgotPassword />}
          />
          <Route path="/checkemail" element={<CheckEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
