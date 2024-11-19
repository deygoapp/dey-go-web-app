import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUppage';
import SetPinPage from './pages/SetPinPage';  // Import the SetPinPage component
import ConfirmPinPage from './pages/ConfirmPinPage';  // Import the ConfirmPinPage component
import LoginPage from './pages/LoginPage';  // If you want to add login page after confirmation

function AppRoutes() {
  return (
    <Routes>
      {/* Sign-up page */}
      <Route path="/" element={<SignUpPage />} />
      
      {/* Set PIN page */}
      <Route path="/set-pin" element={<SetPinPage />} />
      
      {/* Confirm PIN page */}
      <Route path="/confirm-pin" element={<ConfirmPinPage />} />

      {/* Login Page */}
      {/* Add this route if users can log in after confirming PIN */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
