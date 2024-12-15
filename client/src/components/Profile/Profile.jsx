import { useEffect } from "react";
import styles from "./ProfileStyles.module.css";
import portrait from "../../assets/swordsman_portrait2.png";
import authCheckContent from "../../helpers/authCheckContent";

const Profile = () => {
  // Check cookie validity
  const { checkAuth } = authCheckContent();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className={styles.container}>
      <div className={styles.outerCard}>
        <h1 className={styles.profileTitle}>Hero Card</h1>
        <div className={styles.innerCard}>
          <img
            className={styles.portrait}
            src={portrait}
            alt="Character portrait"
          />
          <div className={styles.profileInfo}>
            <h2>Deregon Cross</h2>
            <h3>Hero Type: Knight</h3>
            <h3>Level: 30</h3>
            <h3>Birthday: 22.09.1993</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
