import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Inbox from "./components/InboxPage/Inbox";
import Button from "./Button";
import Login from "./components/Auth/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <div>
              <NavBar />
              <div className="flex flex-row">
                <SideBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/button" element={<Button />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
