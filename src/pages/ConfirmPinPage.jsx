import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetPinPage.css';
import backButtonImage from '../assets/images/back.png'; 
import logoImage from '../assets/images/Dey-go logo.png';  
import success from '../assets/images/successful.png'

function ConfirmPinPage() {

  const [pin, setPin] = useState(['', '', '', '']);
 
  const [pinConfirmed, setPinConfirmed] = useState(false);

  
  const inputRefs = useRef([]);

  const navigate = useNavigate();

 
  const handlePinChange = (e, index) => {
    const value = e.target.value;

   
    if (value === '' || /^[0-9]$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;  
      setPin(newPin);

     
      if (value && index < pin.length - 1) {
        inputRefs.current[index + 1].focus(); 
      }
    }
  };


  const handleConfirmPin = () => {
    if (pin.every(digit => digit !== '')) {
      setPinConfirmed(true);  
    } else {
      alert('Please enter all digits.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');  
  };

  return (
    <div className="set-pin-page">
   
      <div className="back-button" onClick={() => window.history.back()}>
        <img src={backButtonImage} alt="Back" />
      </div>

      {!pinConfirmed && (
        <div className="main-container">
          <div className="icon-section">
            <div className="logo">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
          </div>
        </div>
      )}

      {!pinConfirmed && <h2>Please set CONFIRM to secure your account</h2>}

   
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

      {!pinConfirmed && (
        <button onClick={handleConfirmPin} className="set-pin-button">
          Confirm
        </button>
      )}

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
