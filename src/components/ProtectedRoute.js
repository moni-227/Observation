import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // check JWT in localStorage
  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  return children; // show the protected page
}

export default ProtectedRoute;
