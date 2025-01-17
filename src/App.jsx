import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Inbox from "./components/InboxPage/Inbox";
import Button from "./Button";
import Login from "./components/Auth/Login";
import ClipsPage from "./components/ClipsPage/ClipsPage";
import DocsPage from "./components/DocsPage/DocsPage";
import Goals from "./components/GoalsPage/Goals";
import Signup from "./components/Auth/Signup";
import Timesheets from "./components/TimesheetsPage/Timesheets";
import PulsePage from "./components/PulsePage/PulsePage";
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
