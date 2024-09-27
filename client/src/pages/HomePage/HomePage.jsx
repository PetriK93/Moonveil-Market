import React from "react";
import { useState } from "react";
import styles from "./HomePageStyles.module.css";
import portrait from "../../assets/swordsman.png"; /*Temporary */
import searchIcon from "../../assets/Magnifying_glass_png.png";
import searchGif from "../../assets/Magnifying_glass_gif.gif";

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Browse Auctions</h1>
      <div className={styles.auctionHouse}>
        <div className={styles.classPortrait}>
          <img
            className={styles.classImg}
            src={portrait}
            alt="Class portrait"
          />
        </div>
        <div className={styles.searchSection}>
          <form>
            <input
              type="text"
              placeholder="Name"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <img
              src={isFocused ? searchGif : searchIcon}
              alt="Search"
              className={styles.inputIcon}
            />
            <div className={styles.buttonContainer}>
              <button type="button">Search</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
