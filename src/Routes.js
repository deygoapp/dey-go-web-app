import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUppage';
import SetPinPage from './pages/SetPinPage';
import ConfirmPinPage from './pages/ConfirmPinPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/Forgotpassword'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/set-pin" element={<SetPinPage />} />
      <Route path="/confirm-pin" element={<ConfirmPinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

    </Routes>
  );
}

export default AppRoutes;
