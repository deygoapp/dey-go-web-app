import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
import backButtonImage from '../assets/images/back.png';
import logoImage from '../assets/images/Dey-go logo.png';
import eyeIcon from '../assets/images/eye.png';
import eyeSlashIcon from '../assets/images/eye-slash.svg';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const allFieldsFilled = formData.name && formData.emailOrPhone && formData.password;

  const handleCreateAccount = async () => {
    if (allFieldsFilled) {
      setLoading(true);
      setErrorMessage(null);

      try {
        // Log formData to ensure correct values
        console.log('FormData being sent:', formData);

        // Adjust payload if backend expects specific keys
        const payload = {
          name: formData.name,
          email: formData.emailOrPhone, // Change key if the backend requires "email"
          password: formData.password
        };

        const response = await axios.post(
          'https://tozdti5qo7.execute-api.us-east-1.amazonaws.com/Prod/api/auth/register',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer key' // Replace with valid token if needed
            }
          }
        );

        console.log('Account created:', response.data);
        navigate('/set-pin');
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Error creating account.');
          console.error('Error creating account:', error.response.data);
        } else if (error.request) {
          setErrorMessage('No response from server. Please try again.');
          console.error('No response received:', error.request);
        } else {
          setErrorMessage('Error setting up request.');
          console.error('Error setting up request:', error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="main-container">
        <div className="icon-section">
          <button className="back-button" onClick={() => navigate(-1)}>
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
          To access this feature, please create an account
        </div>

        <div className="input-container">
          <div className="input-field">
            <input
              type="text"
              className="input-box"
              placeholder=" "
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label className="input-label">Name</label>
          </div>
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
              type={showPassword ? 'text' : 'password'}
              className="input-box"
              placeholder=" "
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              pattern="^(?=.*\\d)(?=.*[a-zA-Z]).{8,}$"
              title="Password must be at least 8 characters long and include at least one number"
            />
            <label className="input-label">Password</label>
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? eyeIcon : eyeSlashIcon}
                alt={showPassword ? 'Hide Password' : 'Show Password'}
              />
            </button>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="or-divider">
          <div className="or-divider-line"></div>
          <span className="or-text">OR</span>
          <div className="or-divider-line"></div>
        </div>

        <div className="continue-button">
          <span className="continue-text">Continue with</span>
          <div className="social-icons">
            <div className="social-icon"></div>
          </div>
        </div>

        <button
          className="create-account-button"
          onClick={handleCreateAccount}
          style={{
            backgroundColor: allFieldsFilled ? '#FB3D3D' : 'rgba(251, 61, 61, 0.13)',
            color: allFieldsFilled ? 'white' : 'rgba(0, 0, 0, 0.3)'
          }}
          disabled={!allFieldsFilled || loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <div className="square-icon">
          <div className="square-icon-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
