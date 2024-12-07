import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';
import backButtonImage from '../assets/images/back.png';
import logoImage from '../assets/images/Dey-go logo.png';

function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handleResetPassword = () => {
    if (emailOrPhone) {
      navigate('/reset-link-sent');
    }
  };

  const isFormValid = emailOrPhone.trim() !== '';

  return (
    <div className="forgot-password-page">
      <div className="main-container">
        <div className="icon-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src={backButtonImage} alt="Back" className="icon-image" />
          </button>
          <div className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
        </div>

        

        <div className="title-text">Forgot Password</div>
        <p className="description-text">
          Enter your email, and we’ll send you a link to reset your password.
        </p>

        <div className="input-container">
          <div className="input-field">
            <input
              type="text"
              className="input-box"
              placeholder=" "
              name="email"
              value={emailOrPhone}
              onChange={handleInputChange}
              required
            />
            <label className="input-label">Email</label>
          </div>
        </div>

        <button
          className="reset-password-button"
          onClick={handleResetPassword}
          style={{
            backgroundColor: isFormValid ? '#FB3D3D' : 'rgba(251, 61, 61, 0.13)',
            color: isFormValid ? 'white' : 'rgba(0, 0, 0, 0.3)',
          }}
          disabled={!isFormValid}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
