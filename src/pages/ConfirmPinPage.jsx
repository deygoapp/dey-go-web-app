import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetPinPage.css';
import backButtonImage from '../assets/images/back.png';  // Your back button image
import logoImage from '../assets/images/Dey-go logo.png';  // Your logo image
import success from '../assets/images/successful.png'

function ConfirmPinPage() {
  // State to store pin values
  const [pin, setPin] = useState(['', '', '', '']);
  // State to track if the PIN is confirmed
  const [pinConfirmed, setPinConfirmed] = useState(false);

  // Refs to input fields to handle focus programmatically
  const inputRefs = useRef([]);
  
  // Hook to navigate to other pages
  const navigate = useNavigate();

  // Handle input change
  const handlePinChange = (e, index) => {
    const value = e.target.value;

    // Check if the input is a valid number and has length of 1
    if (value === '' || /^[0-9]$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;  // Update the specific pin input box
      setPin(newPin);

      // Move focus to the next input if the current input has a value
      if (value && index < pin.length - 1) {
        inputRefs.current[index + 1].focus(); // Focus on the next input field
      }
    }
  };

  // Handle confirming the pin
  const handleConfirmPin = () => {
    if (pin.every(digit => digit !== '')) {
      setPinConfirmed(true);  // Set pin as confirmed
    } else {
      alert('Please enter all digits.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="set-pin-page">
      {/* Back Button */}
      <div className="back-button" onClick={() => window.history.back()}>
        <img src={backButtonImage} alt="Back" />
      </div>

      {/* Title for Set Pin */}
      {!pinConfirmed && (
        <div className="main-container">
          <div className="icon-section">
            <div className="logo">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
          </div>
        </div>
      )}

      {/* Title for Confirm Pin */}
      {!pinConfirmed && <h2>Please set CONFIRM to secure your account</h2>}

      {/* Pin Input Fields */}
      {!pinConfirmed && (
        <div className="pin-input-container">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(e, index)}
              ref={(el) => inputRefs.current[index] = el}
              className="pin-input"
            />
          ))}
        </div>
      )}

      {/* Confirm Pin Button */}
      {!pinConfirmed && (
        <button onClick={handleConfirmPin} className="set-pin-button">
          Confirm
        </button>
      )}

      {/* Modal - Only visible after PIN confirmation */}
      {pinConfirmed && (
        <div className="modal">
          <div className="modal-content">
           
            <div className="modal-body">
              <div className="modal-image">
              <img src={success} alt="Success" />
              </div>
              <div className="modal-text">
                Your account has been created successfully
              </div>
              <button className="login-button" onClick={handleLoginRedirect}>
                Login to your account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmPinPage;
