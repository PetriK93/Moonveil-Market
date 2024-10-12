import React from "react";
import styles from "./SearchBarStyles.module.css";
import { useState } from "react";
import searchIcon from "../../assets/Magnifying_glass_png.png";
import searchGif from "../../assets/Magnifying_glass_gif.gif";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for the desired item"
        autoComplete="off"
        spellCheck="false"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <img
        src={isFocused ? searchGif : searchIcon}
        alt="Search"
        className={styles.inputIcon}
      />
    </div>
  );
};

export default SearchBar;
