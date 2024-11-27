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

  const passwordIcon = isPasswordVisible ? showIcon : hideIcon;
  const confirmPasswordIcon = isConfirmPasswordVisible ? showIcon : hideIcon;

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const isPasswordMatch = password === confirmPassword;

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
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          <input
            className={styles.inputTop}
            type="text"
            placeholder="Username"
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
        </div>
        <button
          className={styles.createAccountButton}
          type="button"
          disabled={!isPasswordMatch}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;