import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Inbox from "./components/InboxPage/Inbox";
import RecentsCard from "./components/HomePage/Cards/RecentsCard";
import AssignedCard from "./components/HomePage/Cards/AssignedCard";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/docs" element={<RecentsCard />} />
          <Route path="/goals" element={<AssignedCard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
