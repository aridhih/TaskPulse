import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/ToolPages/HomePage/Home";
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
import EmailVerification from "./components/Auth/EmailVerification";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Wrapper for protected routes
import MainLayout from "./components/Layout/MainLayout"; // Main Layout for authenticated users
import RegistrationSuccess from "./components/Auth/RegistrationSuccess";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/EmailVerification" element={<EmailVerification />} />
        <Route path="/signup/EmailVerification/RegistrationSuccess" element={<RegistrationSuccess />} />

        {/* Admin Route */}
        <Route path="/admin123" element={<AdminPanel />} />

        {/* Protected Routes (Requires Authentication) */}
        <Route element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
          <Route path="/home" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/clips" element={<ClipsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/pulse" element={<PulsePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
