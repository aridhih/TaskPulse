import React from "react";
import { Outlet } from "react-router-dom"; // To render child routes
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Loader from "../Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const MainLayout = () => {
  const [user, loading] = useAuthState(auth); // Check Firebase Auth state

  return (
    <div>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <div className="flex-grow  relative">
          {loading && <Loader />} {/* Show Loader while Firebase is checking auth */}
          <Outlet /> {/* Renders the correct page inside the layout */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
// In this snippet, we've created a MainLayout component that includes a NavBar, SideBar, and a Loader component. The MainLayout component also renders the child routes using the Outlet component from react-router-dom. This allows us to create a consistent layout for all authenticated users.
// The MainLayout component checks the Firebase authentication state using the useAuthState hook from react-firebase-hooks. If the user is authenticated, it renders the child routes. If the user is not authenticated, it redirects to the login page.