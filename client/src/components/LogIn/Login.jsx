import { useState } from "react";
import styles from "./LoginStyles.module.css";
import usernameIcon from "../../assets/username_icon.png";
import passwordIcon from "../../assets/password_icon.png";
import logInImg from "../../assets/log_in_img.png";
import SignUp from "../SignUp/SignUp";

const Login = () => {
  const [isCreateVisible, setIsCreateVisible] = useState(false);

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
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.loginButton}>
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
