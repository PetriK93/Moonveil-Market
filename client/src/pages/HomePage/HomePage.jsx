import React, { useState } from "react";
import styles from "./HomePageStyles.module.css";
import portrait from "../../assets/swordsman.png"; // Temporary
import searchIcon from "../../assets/Magnifying_glass_png.png";
import searchGif from "../../assets/Magnifying_glass_gif.gif";
import previousImg from "../../assets/previous_img.png";
import nextImg from "../../assets/next_img.png";

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [levelMin, setLevelMin] = useState("");
  const [levelMax, setLevelMax] = useState("");

  const handleLevelChange = (e, setValue) => {
    const value = e.target.value;

    if (/^\d{0,2}$/.test(value)) {
      setValue(value);
    }
  };

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
            <div className={styles.rangeContainer}>
              <input
                className={styles.levelRange}
                type="text"
                value={levelMin}
                min="1"
                max="60"
                placeholder="Min"
                onChange={(e) => handleLevelChange(e, setLevelMin)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <p>-</p>
              <input
                className={styles.levelRange}
                type="text"
                value={levelMax}
                min="1"
                max="60"
                placeholder="Max"
                onChange={(e) => handleLevelChange(e, setLevelMax)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.topBtnContainer}>
                <button className={styles.topBtn} type="button">
                  Search
                </button>
                <button
                  className={styles.topBtn}
                  type="reset"
                  onClick={() => {
                    setLevelMin("");
                    setLevelMax("");
                  }}
                >
                  Reset
                </button>
              </div>
              <div className={styles.bottomBtnContainer}>
                <button className={styles.bottomBtn} type="button"></button>
                <p className={styles.prevText}>Prev</p>
                <p className={styles.nextText}>Next</p>
                <button className={styles.bottomBtn} type="button"></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
