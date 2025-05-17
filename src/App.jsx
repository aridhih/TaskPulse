import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import { UserProvider } from './components/Layout/UserContext';
import Loader from './components/Loader';
import usePresence from './hooks/usePresence';

// Lazy-loaded components
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const ForgotPassword = lazy(() => import('./components/Auth/ForgotPassword'));
const EmailSent = lazy(() => import('./components/Auth/EmailSent'));
const EmailVerification = lazy(() => import('./components/Auth/EmailVerification'));
const RegistrationSuccess = lazy(() => import('./components/Auth/RegistrationSuccess'));
const AdminPanel = lazy(() => import('./components/AdminPanel/AdminPanel'));
const Home = lazy(() => import('./components/ToolPages/HomePage/Home'));
const Inbox = lazy(() => import('./components/ToolPages/InboxPage/Inbox'));
const ClipsPage = lazy(() => import('./components/ToolPages/ClipsPage/ClipsPage'));
const DocsPage = lazy(() => import('./components/ToolPages/DocsPage/DocsPage'));
const Goals = lazy(() => import('./components/ToolPages/GoalsPage/Goals'));
const Timesheets = lazy(() => import('./components/ToolPages/TimesheetsPage/Timesheets'));
const PulsePage = lazy(() => import('./components/ToolPages/PulsePage/PulsePage'));
const Teams = lazy(() => import('./components/Teams/Teams'));

function App() {
  usePresence();

  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<Loader />}>
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
            <Route path="/user:admin/adminpanel" element={<AdminPanel />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/home" element={<Home />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/clips" element={<ClipsPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/timesheets" element={<Timesheets />} />
              <Route path="/pulse" element={<PulsePage />} />
              <Route path="/teams" element={<Teams />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
