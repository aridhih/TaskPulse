import React from "react";
import { Outlet } from "react-router-dom"; // To render child routes
import NavBar from "../Navbar/NavBar";
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
