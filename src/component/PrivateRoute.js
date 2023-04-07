import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  // const navigate = useNavigate()

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
