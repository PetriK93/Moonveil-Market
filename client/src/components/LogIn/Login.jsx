import styles from "./LoginStyles.module.css";
import usernameIcon from "../../assets/username_icon.png";
import passwordIcon from "../../assets/password_icon.png";

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
              placeholder="username"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>
          <div className={styles.passwordContainer}>
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="text"
              placeholder="password"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>
          <button type="button" className={styles.loginButton}>
            Login
          </button>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default Login;
