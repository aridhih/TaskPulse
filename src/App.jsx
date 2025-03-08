import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/ToolPages/HomePage/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Inbox from "./components/ToolPages/InboxPage/Inbox";
import Login from "./components/Auth/Login";
import ClipsPage from "./components/ToolPages/ClipsPage/ClipsPage";
import DocsPage from "./components/ToolPages/DocsPage/DocsPage";
import Goals from "./components/ToolPages/GoalsPage/Goals";
import Signup from "./components/Auth/Signup";
import Timesheets from "./components/ToolPages/TimesheetsPage/Timesheets";
import PulsePage from "./components/ToolPages/PulsePage/PulsePage";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminPanel from "./components/AdminPanel/AdminPanel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin123" element={<AdminPanel />} />
        <Route path="/signup" element={<Signup />} />


        <Route
          path="/*"
          element={
            <div>
              <NavBar />
              <div className="flex flex-row">
                <SideBar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/clips" element={<ClipsPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/timesheets" element={<Timesheets />} />
                  <Route path="/pulse" element={<PulsePage />} />
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
