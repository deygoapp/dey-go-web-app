import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpPage.css";
import backButtonImage from "../assets/images/back.png";
import logoImage from "../assets/images/Dey-go logo.png";
import eyeIcon from "../assets/images/eye.png";
import eyeSlashIcon from "../assets/images/eye-slash.svg";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    if (username && password) {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          "https://tozdti5qo7.execute-api.us-east-1.amazonaws.com/Prod/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Explicitly sending JSON payload
            },
            body: JSON.stringify({ username, password }), // JSON payload
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed. Please try again.");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        navigate("/dashboard");
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage(error.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const allFieldsFilled = formData.username && formData.password;

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

        <div className="title-text">Login to your account</div>

        <div className="input-container">
          <div className="input-field">
            <input
              type="text"
              className="input-box"
              placeholder=" "
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label className="input-label">Username</label>
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
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? eyeIcon : eyeSlashIcon}
                alt={showPassword ? "Hide Password" : "Show Password"}
              />
            </button>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button
          className="create-account-button"
          onClick={handleLogin}
          style={{
            backgroundColor: allFieldsFilled ? "#FB3D3D" : "rgba(251, 61, 61, 0.13)",
            color: allFieldsFilled ? "white" : "rgba(0, 0, 0, 0.3)",
          }}
          disabled={!allFieldsFilled || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="login-footer">
          <Link to="/forgot-password" className="login-link">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
