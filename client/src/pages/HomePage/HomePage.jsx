import React, { useState } from "react";
import styles from "./HomePageStyles.module.css";
import portrait from "../../assets/swordsman.png"; // Temporary
import searchIcon from "../../assets/Magnifying_glass_png.png";
import searchGif from "../../assets/Magnifying_glass_gif.gif";
import previousImg from "../../assets/previous_img.png";
import nextImg from "../../assets/next_img.png";
import weaponsCategory from "../../assets/weapons_category.png";
import armorCategory from "../../assets/armor_category.png";
import potionsCategory from "../../assets/potions_category.png";
import enchantmentsCategory from "../../assets/enchantments_category.png";
import craftingCategory from "../../assets/crafting_category.png";
import recipesCategory from "../../assets/recipes_category.png";
import questItemsCategory from "../../assets/questItems_category.png";
import bagsCategory from "../../assets/bags_category.png";
import craftingMaterialsCategory from "../../assets/craftingMaterials_category.png";
import foodCategory from "../../assets/food_category.png";

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
                <button className={styles.bottomBtn} type="button">
                  <img
                    src={previousImg}
                    alt="Previous"
                    className={styles.btnIconLeft}
                  />
                </button>
                <p className={styles.prevText}>Prev</p>
                <p className={styles.nextText}>Next</p>
                <button className={styles.bottomBtn} type="button">
                  <img
                    src={nextImg}
                    alt="Next"
                    className={styles.btnIconRight}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.categorySection}>
          <button className={styles.category}>
            Weapons
            <img
              src={weaponsCategory}
              alt="Weapons category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Armor
            <img
              src={armorCategory}
              alt="Armor category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Potions
            <img
              src={potionsCategory}
              alt="Potions category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Food
            <img
              src={foodCategory}
              alt="Food category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Enchantments
            <img
              src={enchantmentsCategory}
              alt="Enchantments category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Crafting tools
            <img
              src={craftingCategory}
              alt="Crafting tools category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Crafting materials
            <img
              src={craftingMaterialsCategory}
              alt="Crafting materials category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Recipes
            <img
              src={recipesCategory}
              alt="Recipes category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Bags
            <img
              src={bagsCategory}
              alt="Bags category"
              className={styles.categoryIcon}
            />
          </button>
          <button className={styles.category}>
            Quest items
            <img
              src={questItemsCategory}
              alt="Quest items category"
              className={styles.categoryIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
