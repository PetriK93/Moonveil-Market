import React from "react";
import styles from "./HomePageStyles.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Moonveil Marketplace!</h1>
      <p>
        Here you can auction your items for other people and communicate with
        each other.
      </p>
    </div>
  );
};

export default Home;
