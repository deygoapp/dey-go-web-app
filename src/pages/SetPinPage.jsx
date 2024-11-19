import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  
import './SetPinPage.css';  
import backButtonImage from '../assets/images/back.png';  
import logoImage from '../assets/images/Dey-go logo.png';

function SetPinPage() {
  
  const [pin, setPin] = useState(['', '', '', '']);
  
  const inputRefs = useRef([]);
  
 
  const navigate = useNavigate();


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

  // Handle form submission 
  const handleSetPin = () => {
    if (pin.every(digit => digit !== '')) {
      navigate('/confirm-pin');
    } else {
      alert('Please enter all digits.');
    }
  };

  return (
    <div className="set-pin-page">
      
      <div className="back-button" onClick={() => window.history.back()}>
        <img src={backButtonImage} alt="Back" />
      </div>


      <div className="main-container">
        <div className="icon-section">
          <div className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
        </div>
      </div>

      <h2>Please set PIN to secure your account</h2>

      {/* Pin Input Fields */}
      <div className="pin-input-container">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handlePinChange(e, index)}
            ref={(el) => inputRefs.current[index] = el} // Store refs for inputs
            className="pin-input"
          />
        ))}
      </div>

      {/* Set Pin Button */}
      <button
        onClick={handleSetPin}
        className="set-pin-button"
      >
        Set Pin
      </button>
    </div>
  );
}

export default SetPinPage;  