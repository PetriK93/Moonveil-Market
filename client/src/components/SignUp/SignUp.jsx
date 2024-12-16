import axios from "axios";
import styles from "./SignUpStyles.module.css";
import { useState } from "react";
import showIcon from "../../assets/show_icon.png";
import hideIcon from "../../assets/hide_icon.png";
import createProfileIcon from "../../assets/create_profile_icon.png";
import closeIcon from "../../assets/close_icon.png";

const SignUp = ({ onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [heroType, setHeroType] = useState("");

  const passwordIcon = isPasswordVisible ? showIcon : hideIcon;
  const confirmPasswordIcon = isConfirmPasswordVisible ? showIcon : hideIcon;

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleHeroTypeChange = (e) => setHeroType(e.target.value);

  const isPasswordMatch = password === confirmPassword;

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
            <button className={styles.dropdownHeader}>
              <span class="dropdownSelected">Select hero type</span>
              <span class="dropdownArrow"> ▼</span>
            </button>
            <ul class="dropdownMenu">
              <li class="dropdownItem">Warrior</li>
              <li class="dropdownItem">Mage</li>
              <li class="dropdownItem">Archer</li>
              <li class="dropdownItem">Druid</li>
              <li class="dropdownItem">Barbarian</li>
              <li class="dropdownItem">Gunman</li>
              <li class="dropdownItem">Ninja</li>
              <li class="dropdownItem">Martial artist</li>
              <li class="dropdownItem">Priest</li>
              <li class="dropdownItem">Thief</li>
              <li class="dropdownItem">Samurai</li>
              <li class="dropdownItem">Lancer</li>
            </ul>
          </div>

          {/*<select
            className={styles.selectHeroType}
           value={heroType} 
           onChange={handleHeroTypeChange} 
           required
           >
            <option value="">Select Hero Type</option>
            <option value="warrior">Warrior</option>
            <option value="mage">Mage</option>
            <option value="archer">Archer</option>
            <option value="druid">Druid</option>
            <option value="barbarian">Barbarian</option>
            <option value="gunman">Gunman</option>
            <option value="ninja">Ninja</option>
            <option value="martial artist">Martial Artist</option>
            <option value="priest">Priest</option>
            <option value="thief">Thief</option>
            <option value="samurai">Samurai</option>
            <option value="lancer">Lancer</option>
        </select>*/}
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
