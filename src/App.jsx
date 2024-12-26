import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Inbox from "./components/InboxPage/Inbox";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
