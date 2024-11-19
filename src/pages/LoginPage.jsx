import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './SignUpPage.css';
import backButtonImage from '../assets/images/back.png';
import logoImage from '../assets/images/Dey-go logo.png';
import eyeIcon from '../assets/images/eye.png';
import eyeSlashIcon from '../assets/images/eye-slash.svg';

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check if all fields are filled
  const allFieldsFilled = formData.name && formData.emailOrPhone && formData.password;

  // Handle button click to navigate to the Create Pin page
  const handleCreateAccount = () => {
    if (allFieldsFilled) {
      navigate('/set-pin'); // Navigate to Create Pin page
    }
  };

  return (
    <div className="signup-page">
      <div className="main-container">
        <div className="icon-section">
          <button className="back-button">
            <img src={backButtonImage} alt="Back" className="icon-image" />
          </button>
          <div className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
        </div>

        <div className="circle">
          <div className="circle-background"></div>
          <div className="circle-inner"></div>
        </div>

        <div className="title-text">
        Login to your account
        </div>

        <div className="input-container">
          <div className="input-field">
            <input
              type="email"
              className="input-box"
              placeholder=" "
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              required
            />
            <label className="input-label">Email or Phone Number</label>
          </div>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              className="input-box"
              placeholder=" "
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
              title="Password must be at least 8 characters long and include at least one number"
            />
            <label className="input-label">Password</label>
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? eyeIcon : eyeSlashIcon}
                alt={showPassword ? "Hide Password" : "Show Password"}
              />
            </button>
          </div>
        </div>

        <div className="or-divider">
          <div className="or-divider-line"></div>
          <span className="or-text">OR</span>
          <div className="or-divider-line"></div>
        </div>

        <div className="continue-button">
          <span className="continue-text">Continue with</span>
          <div className="social-icons">
            <div className="social-icon"></div>
            {/* Add other social icons here */}
          </div>
        </div>

        <button
          className="create-account-button"
          onClick={handleCreateAccount} // Trigger navigation on click
          style={{
            backgroundColor: allFieldsFilled ? '#FB3D3D' : 'rgba(251, 61, 61, 0.13)',
            color: allFieldsFilled ? 'white' : 'rgba(0, 0, 0, 0.3)'
          }}
          disabled={!allFieldsFilled}
        >
          Login
        </button>

        <div className="square-icon">
          <div className="square-icon-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
