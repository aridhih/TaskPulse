import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Loader from "../Loader";
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />; // Show loader while checking authentication
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
// In this snippet, we've created a ProtectedRoute component that checks if the user is authenticated. If the user is authenticated, it renders the children (nested routes). If the user is not authenticated, it redirects to the login page using the Navigate component from react-router-dom.