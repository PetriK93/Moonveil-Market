import styles from "./LoginStyles.module.css";
import usernameIcon from "../../assets/username_icon.png";
import passwordIcon from "../../assets/password_icon.png";
import logInImg from "../../assets/log_in_img.png";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logInContainer}>
        <div className={styles.leftContainer}>
          <h1>LOGIN</h1>
          <p>Login or create a new profile.</p>
          <div className={styles.usernameContainer}>
            <img src={usernameIcon} alt="Username icon" />
            <input
              type="text"
              placeholder="Username"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
          <div className={styles.passwordContainer}>
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="text"
              placeholder="Password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.loginButton}>
              Login
            </button>
            <button type="button" className={styles.signUpButton}>
              Sign Up
            </button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src={logInImg} alt="Animated character" />
        </div>
      </div>
    </div>
  );
};

export default Login;
