import React from "react";
import { useSelector, UseSelector } from "react-redux";
import { AuthState } from "../modules/auth/authSlice";
import { Outlet, Navigate } from "react-router-dom";

type Props = {};

interface RootState {
  auth: AuthState;
}

export default function PrivateRoute({}: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" replace />;
}
