import React from "react";
import styles from "./HomePageStyles.module.css";
import portrait from "../../assets/swordsman.png"; /*Temporary */

const Home = () => {
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
        <div className={styles.searchSection}></div>
      </div>
    </div>
  );
};

export default Home;
