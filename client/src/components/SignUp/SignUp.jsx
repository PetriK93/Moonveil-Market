import styles from "./SignUpStyles.module.css";
import { useState } from "react";
import showIcon from "../../assets/show_icon.png";
import hideIcon from "../../assets/hide_icon.png";
import createProfileIcon from "../../assets/create_profile_icon.png";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleIcon = isVisible === false ? hideIcon : showIcon;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img
          className={styles.createProfileIcon}
          src={createProfileIcon}
          alt="Create profile icon"
        />
        <h1 className={styles.createAccountTitle}>Create Account</h1>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email address"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          <div className={styles.createPasswordContainer}>
            <input
              type="text"
              placeholder="Password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
            <img src={visibleIcon} alt="Password visibility icon" />
          </div>
          <div className={styles.confirmPasswordContainer}>
            <input
              type="text"
              placeholder="Confirm password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
            <img src={visibleIcon} alt="Password visibility icon" />
          </div>
        </div>
        <button className={styles.createAccountButton} type="button">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;
