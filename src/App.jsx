import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/ToolPages/HomePage/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Inbox from "./components/ToolPages/InboxPage/Inbox";
import Button from "./Button";
import Login from "./components/Auth/Login";
import ClipsPage from "./components/ToolPages/ClipsPage/ClipsPage";
import DocsPage from "./components/ToolPages/DocsPage/DocsPage";
import Goals from "./components/ToolPages/GoalsPage/Goals";
import Signup from "./components/Auth/Signup";
import Timesheets from "./components/ToolPages/TimesheetsPage/Timesheets";
import PulsePage from "./components/ToolPages/PulsePage/PulsePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/button" element={<Button />} />


        <Route
          path="/*"
          element={
            <div>
              <NavBar />
              <div className="flex flex-row bg-gray-200">
                <SideBar />
                <Routes>
                  <Route path="/" element={<Home />} />
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
