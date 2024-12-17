import axios from "axios";
import styles from "./SignUpStyles.module.css";
import { useState, useEffect } from "react";
import showIcon from "../../assets/show_icon.png";
import hideIcon from "../../assets/hide_icon.png";
import createProfileIcon from "../../assets/create_profile_icon.png";
import closeIcon from "../../assets/close_icon.png";

const SignUp = ({ onClose }) => {
  // useStates
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [heroType, setHeroType] = useState("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const passwordIcon = isPasswordVisible ? showIcon : hideIcon;
  const confirmPasswordIcon = isConfirmPasswordVisible ? showIcon : hideIcon;
  const isPasswordMatch = password === confirmPassword;

  // State setter functions
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Open or close the dropdown menu
  const handleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  // Function to handle heroType
  const handleHeroType = (e) => {
    const value = e.target.getAttribute("data-value");
    setHeroType(value);
    setDropdownIsOpen((prev) => !prev);
  };

  // Log out the heroType when the value changes
  useEffect(() => {
    console.log("Updated heroType:", heroType);
  }, [heroType]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("HandleSubmit function triggered");

    console.log("Email", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Is Password Match:", isPasswordMatch);
    console.log("Selected Hero Type:", heroType);

    // Input validation section
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 5) {
      alert("Password needs to be at least 5 characters");
      return;
    }

    if (!isPasswordMatch) {
      alert("Passwords do not match");
      return;
    }

    if (username.length < 5) {
      alert("Username needs to be at least 5 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { email, username, password, heroType }
      );
      console.log("Registration successful:", response.data);
      onClose();
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img
          className={styles.closeIcon}
          src={closeIcon}
          alt="Close window icon"
          onClick={() => {
            console.log("Close icon clicked");
            onClose();
          }}
        />
        <img
          className={styles.createProfileIcon}
          src={createProfileIcon}
          alt="Create profile icon"
        />
        <h1 className={styles.createAccountTitle}>Create Account</h1>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputTop}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          <input
            className={styles.inputTop}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          <div className={styles.createPasswordContainer}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
            <img
              src={passwordIcon}
              alt="Password visibility icon"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            />
          </div>
          <div className={styles.confirmPasswordContainer}>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
            <img
              src={confirmPasswordIcon}
              alt="Password visibility icon"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            />
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownHeader} onClick={handleDropdown}>
              <span className={styles.dropdownSelected}>
                {heroType
                  ? heroType.charAt(0).toUpperCase() + heroType.slice(1)
                  : "Select hero type"}
              </span>
              <span
                className={`${styles.dropdownArrow} ${
                  dropdownIsOpen ? styles.arrowRotated : ""
                }`}
              >
                ▼
              </span>
            </button>
            <ul
              className={
                dropdownIsOpen
                  ? `${styles.dropdownMenu} ${styles.dropdownMenuOpen}`
                  : styles.dropdownMenu
              }
            >
              <li
                className={styles.dropdownItem}
                data-value="warrior"
                onClick={handleHeroType}
              >
                Warrior
              </li>
              <li
                className={styles.dropdownItem}
                data-value="mage"
                onClick={handleHeroType}
              >
                Mage
              </li>
              <li
                className={styles.dropdownItem}
                data-value="archer"
                onClick={handleHeroType}
              >
                Archer
              </li>
              <li
                className={styles.dropdownItem}
                data-value="druid"
                onClick={handleHeroType}
              >
                Druid
              </li>
              <li
                className={styles.dropdownItem}
                data-value="barbarian"
                onClick={handleHeroType}
              >
                Barbarian
              </li>
              <li
                className={styles.dropdownItem}
                data-value="gunman"
                onClick={handleHeroType}
              >
                Gunman
              </li>
              <li
                className={styles.dropdownItem}
                data-value="ninja"
                onClick={handleHeroType}
              >
                Ninja
              </li>
              <li
                className={styles.dropdownItem}
                data-value="martial artist"
                onClick={handleHeroType}
              >
                Martial artist
              </li>
              <li
                className={styles.dropdownItem}
                data-value="priest"
                onClick={handleHeroType}
              >
                Priest
              </li>
              <li
                className={styles.dropdownItem}
                data-value="thief"
                onClick={handleHeroType}
              >
                Thief
              </li>
              <li
                className={styles.dropdownItem}
                data-value="samurai"
                onClick={handleHeroType}
              >
                Samurai
              </li>
              <li
                className={styles.dropdownItem}
                data-value="lancer"
                onClick={handleHeroType}
              >
                Lancer
              </li>
            </ul>
          </div>
        </div>
        <button
          className={styles.createAccountButton}
          type="button"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;
