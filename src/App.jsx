import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import SidebarLayout from "./components/Layout";
import FAQsPage from "./pages/FAQs";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

// ----------------------
// MAIN CONTENT HOLDER
// ----------------------
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // IF NOT LOGGED IN → SHOW LOGIN/REGISTER
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        {showRegister ? (
          <RegisterForm onSuccess={() => setShowRegister(false)} />
        ) : (
          <LoginForm />
        )}

        <button
          onClick={() => setShowRegister(!showRegister)}
          className="mt-4 text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  // LOGGED IN → SHOW APP ROUTES
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQsPage />} />
      </Route>

      {/* Extra sample route */}
      <Route path="/faqs-s" element={<FAQsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

// ----------------------
// COMPLETE APP WRAPPER
// ----------------------
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
