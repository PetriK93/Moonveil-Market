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
        <p id="itemName">Thunderfury: Blessed blade of the windseeker</p>
      </div>
      <p id="itemLvl">60</p>
      <p id="timeLeft">24h</p>
      <div className={styles.verticalWrapper}>
        <p id="seller">Deregon</p>
      </div>
      <p id="buyout">Buyout</p>
      <div className={styles.unitPrices}>
        <div className={styles.bidPrice}>12345</div>
        <div className={styles.buyOutPrice}>54321</div>
      </div>
    </div>
  );
};

export default AuctionRow;
