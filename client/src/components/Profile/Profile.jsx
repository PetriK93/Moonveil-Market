import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./ProfileStyles.module.css";
import portrait from "../../assets/swordsman_portrait2.png";
import authCheckContent from "../../helpers/authCheckContent";

const Profile = () => {
  // State to store profile data
  const [profileData, setProfileData] = useState({
    username: "",
    heroType: "",
    characterLevel: "",
    birthday: "",
  });

  const date = new Date(profileData.birthday);
  // Format the date to show day, month, and year
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Check cookie validity
  const { checkAuth } = authCheckContent();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleProfileData = async () => {
    console.log("handleProfileData function triggered");

    try {
      // Make the GET request with axios and ensure cookies are sent with the request
      const response = await axios.get(
        "http://localhost:3000/api/auth/profile-data",
        {
          withCredentials: true, // Make sure cookies (including the JWT token) are sent with the request
        }
      );

      console.log("Profile data fetched successfully:", response.data);
      setProfileData(response.data.userData);
    } catch (err) {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        console.error("Server error:", err.response.status, err.response.data);
      } else if (err.request) {
        // No response received
        console.error("No response received:", err.request);
      } else {
        // Error setting up the request
        console.error("Request error:", err.message);
      }
    }
  };

  // Triggers the profile data fetching on page load
  useEffect(() => {
    handleProfileData();
  }, []);

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
            <h2>
              {profileData.username.charAt(0).toUpperCase() +
                profileData.username.slice(1)}
            </h2>
            <h3>
              {`Hero Type: ${
                profileData.heroType.charAt(0).toUpperCase() +
                profileData.heroType.slice(1)
              }`}
            </h3>
            <h3>{`Character Level: ${profileData.characterLevel}`}</h3>
            <h3>{formattedDate}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
