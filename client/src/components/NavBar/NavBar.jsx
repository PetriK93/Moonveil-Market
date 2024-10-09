import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/brand_logo_1.png";
import styles from "./NavBarStyles.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <header>
        <nav id="navbar">
          <Link to="/">
            <div className={styles.imageWrapper}>
              <img src={brandLogo} alt="Brand logo" />
            </div>
          </Link>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/my-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default NavBar;
