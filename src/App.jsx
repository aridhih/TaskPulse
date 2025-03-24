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
import ProtectedRoute from "./components/Auth/ProtectedRoute"; 
import MainLayout from "./components/Layout/MainLayout"; 
import RegistrationSuccess from "./components/Auth/RegistrationSuccess";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EmailSent from "./components/Auth/EmailSent";
import { UserProvider } from "./components/Layout/UserContext"; 
import { TaskProvider } from "./components/Layout/TaskContext"; 

// Task Management Components
import TaskList from "./components/Task/TaskList";
import TaskDetails from "./components/Task/TaskDetails";
import TaskForm from "./components/Task/TaskForm";
import ProjectTasks from "./components/Task/ProjectTasks";
import TeamTasks from "./components/Task/TeamTasks";


function App() {
  return (
    <UserProvider> 
      <TaskProvider> 
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/forgotpassword" element={<ForgotPassword />} />
            <Route path="/login/forgotpassword/emailsent" element={<EmailSent />} />
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

              {/* Task Management Routes */}
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/:taskId" element={<TaskDetails />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
              <Route path="/teams/:teamId/tasks" element={<TeamTasks />} />
            </Route>
          </Routes>
        </Router>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
