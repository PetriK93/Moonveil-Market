import React from "react";
import styles from "./AuctionRowStyles.module.css";
import spikyGloves from "../../assets/Weapons/20.png";

const AuctionRow = () => {
  return (
    <div className={styles.auctionRow}>
      <img
        className={styles.auctionRowIcon}
        src={spikyGloves}
        alt="Auction row 1"
      />
      <p id="itemName">Item Name</p>
      <p id="itemLvl">1</p>
      <p id="hoursLeft">Hours Left</p>
      <p id="seller">Seller</p>
      <p id="buyout">Buyout</p>
      <div className={styles.unitPrices}>
        <div className={styles.bidPrice}>12345</div>
        <div className={styles.buyOutPrice}>54321</div>
      </div>
    </div>
  );
};

export default AuctionRow;
