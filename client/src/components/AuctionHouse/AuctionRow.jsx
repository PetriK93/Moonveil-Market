import React from "react";
import styles from "./AuctionRowStyles.module.css";
import thunderfury from "../../assets/Weapons/35.png";

const AuctionRow = () => {
  return (
    <div className={styles.auctionRow}>
      <img
        className={styles.auctionRowIcon}
        src={thunderfury}
        alt="Auction row 1"
      />
      <div className={styles.verticalWrapper}>
        <div className={styles.itemName}>
          Thunderfury: Blessed blade of the windseeker
        </div>

        <div className={styles.itemLvl}>60</div>
        <div className={styles.timeLeft}>24h</div>
        <div className={styles.verticalWrapper}>
          <div className={styles.seller}>Deregon Cross</div>
        </div>
        <div className={styles.buyout}>Buyout</div>
        <div className={styles.currentBid}>12345</div>
        <div className={styles.currentBuyout}>54321</div>
      </div>
    </div>
  );
};

export default AuctionRow;
