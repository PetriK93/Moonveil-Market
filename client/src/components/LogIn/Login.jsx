import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./LoginStyles.module.css";
import usernameIcon from "../../assets/username_icon.png";
import passwordIcon from "../../assets/password_icon.png";
import logInImg from "../../assets/log_in_img.png";
import SignUp from "../SignUp/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/refresh-token",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error refreshing token:", err);
      // Handle error (maybe redirect to login)
      alert("Unable to refresh token. Please log in again.");
      navigate("/log-in");
    }
  };

  // Function to check if the token is expired
  const isTokenExpired = () => {
    // Send a request to the server to check the token's expiration
    axios
      .post(
        "http://localhost:3000/api/auth/check-token-expiration",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.tokenExpired) {
          refreshToken(); // If the token is expired, refresh it
        }
      })
      .catch((err) => {
        console.error("Error checking token expiration:", err);
        navigate("/log-in");
      });
  };

  // Check token expiration on page reload
  useEffect(() => {
    isTokenExpired();
  }, []);

  // Login handler function
  const handleLogin = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("HandleLogin function triggered");

    // Log the input values for debugging
    console.log("Email:", email);
    console.log("Password:", password);

    // Input validation section
    if (!email || email.trim().length === 0) {
      alert("Please enter your email.");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || password.trim().length === 0) {
      alert("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/log-in",
        { email, password },
        { withCredentials: true } // Ensure cookies are sent/received
      );

      // Success message or actions
      console.log("Login successful:", response.data);
      alert("Login successful!");

      // Use useNavigate for redirecting without page reload
      navigate("/auction-house");
    } catch (err) {
      // Error handling
      if (err.response) {
        console.error("Server error:", err.response.data);
        alert(err.response.data.error || "Login failed. Please try again.");
      } else if (err.request) {
        console.error("Network error:", err.request);
        alert("Unable to connect to the server. Please check your network.");
      } else {
        console.error("Unexpected error:", err.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleOpen = () => {
    console.log("Opening Sign Up");
    setIsCreateVisible(true);
  };

  const handleClose = () => {
    console.log("Closing Sign Up");
    setIsCreateVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logInContainer}>
        <div className={styles.leftContainer}>
          <h1>LOGIN</h1>
          <p>Login or create a new profile.</p>
          <div className={styles.usernameContainer}>
            <img src={usernameIcon} alt="Username icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
          </div>
          <div className={styles.passwordContainer}>
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.loginButton}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              onClick={handleOpen}
              type="button"
              className={styles.signUpButton}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src={logInImg} alt="Animated character" />
        </div>
      </div>
      {isCreateVisible && <SignUp onClose={handleClose} />}
    </div>
  );
};

export default Login;
