import React from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "../../assets/brand_logo_1.png";
import styles from "./NavBarStyles.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // If using cookies, clear them with an API call to the backend
      await fetch("http://localhost:3000/api/auth/log-out", {
        method: "POST",
        credentials: "include",
      });

      // Redirect to the login page
      navigate("/log-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <nav id="navbar">
          <Link to="/auction-house">
            <div className={styles.imageWrapper}>
              <img src={brandLogo} alt="Brand logo" />
            </div>
          </Link>
          <ul>
            <li>
              <Link to="/auction-house">Auction House</Link>
            </li>
            <li>
              <Link to="/my-profile">Profile</Link>
            </li>
            <li onClick={handleLogout}>Log Out</li>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default NavBar;
