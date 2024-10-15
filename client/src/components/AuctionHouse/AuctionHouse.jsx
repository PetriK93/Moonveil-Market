import React, { useState, useEffect, useRef } from "react";
import styles from "./AuctionHouseStyles.module.css";
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
import sellIcon from "../../assets/sell_icon.png";
import goldCoin from "../../assets/gold_coin.png";
import silverCoin from "../../assets/silver_coin.png";
import copperCoin from "../../assets/copper_coin.png";

const Home = () => {
  // useStates & UseRefs
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [levelMin, setLevelMin] = useState("");
  const [levelMax, setLevelMax] = useState("");
  const [dropdown, setDropdown] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tab, setTab] = useState("browse");
  const [isBrowseFlashing, setIsBrowseFlashing] = useState(false);
  const [isSellFlashing, setIsSellFlashing] = useState(false);
  const categorySectionRef = useRef(null);
  const [goldPrice, setGoldPrice] = useState("");
  const [silverPrice, setSilverPrice] = useState("");
  const [copperPrice, setCopperPrice] = useState("");
  const [goldBuyout, setGoldBuyout] = useState("");
  const [silverBuyout, setSilverBuyout] = useState("");
  const [copperBuyout, setCopperBuyout] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Prevents scrolling the page itself when inside the categorySection
  useEffect(() => {
    const categorySection = categorySectionRef.current;

    const handleScroll = (event) => {
      const scrollTop = categorySection.scrollTop;
      const scrollHeight = categorySection.scrollHeight;
      const height = categorySection.clientHeight;
      const wheelDelta = event.deltaY;
      const isScrollingDown = wheelDelta > 0;

      if (isScrollingDown) {
        // Prevent scrolling down if already at the bottom
        if (scrollTop + height >= scrollHeight) {
          event.preventDefault();
        }
      } else {
        // Prevent scrolling up if already at the top
        if (scrollTop <= 0) {
          event.preventDefault();
        }
      }
    };

    if (tab === "browse") {
      categorySection.addEventListener("wheel", handleScroll);
    }

    // Clean up the event listener when the component unmounts or tab changes
    return () => {
      if (tab === "browse") {
        categorySection.removeEventListener("wheel", handleScroll);
      }
    };
  }, [tab]);

  // Allows you to set a filtered value to an input field
  const handleLevelChange = (e, setValue) => {
    const value = e.target.value;

    // Allow only digits, up to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setValue(value);
    }
  };

  // Adjusts min level to be always less or equal to max level
  const handleLevelBlur = (minValue, maxValue, setMin) => {
    if (
      minValue !== "" &&
      maxValue !== "" &&
      parseInt(minValue) > parseInt(maxValue)
    ) {
      setMin(maxValue);
    }
    setIsFocused(false);
  };

  // Toggles animation and sets dropdown useState
  const toggleDropdown = (category) => {
    if (dropdown === category) {
      setIsAnimating(true);
      setTimeout(() => {
        setDropdown(null);
        setIsAnimating(false);
      }, 400);
    } else {
      setDropdown(category);
    }
  };

  // Toggles animation and sets "browse" as the current tab
  const handleBrowse = () => {
    setIsBrowseFlashing(true);
    setTab("browse");
    // Makes sure the animation has time to play out. Sync with animation.
    setTimeout(() => {
      setIsBrowseFlashing(false);
    }, 500);
  };

  // Toggles animation and sets "sell" as the current tab
  const handleSell = () => {
    setIsSellFlashing(true);
    setTab("sell");
    setDropdown(null);
    // Makes sure the animation has time to play out
    setTimeout(() => {
      setIsSellFlashing(false);
    }, 500);
  };

  // IMPORTANT NOTE: 1 gold = 100 silver, 1 silver = 100 copper

  // Allows only 2 digits in the silver & copper pricing & buyout input fields
  const handleCopperSilver = (e, setPrice) => {
    const value = e.target.value;

    // Allow only digits, up to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  // Allows only 4 digits for gold pricing & buyout input fields
  const handleGold = (e, setPrice) => {
    const value = e.target.value;

    // Allow only digits, up to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setPrice(value);
    }
  };

  // When the drag enters the drop zone
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // When the drag is over the drop zone
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // When the drag leaves the drop zone
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // When the dragged item is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle the dropped image here, e.g., reading the file
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      console.log("Dropped file: ", droppedFiles[0]);
    }
  };

  return (
    <div id="auction-house" className={styles.container}>
      <h1>Auction House</h1>
      {tab === "browse" ? (
        <div className={styles.browseTab}>
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
                name="name"
                type="text"
                value={name}
                autoComplete="off"
                spellCheck="false"
                onChange={(e) => setName(e.target.value)}
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
                  name="minimum level"
                  className={styles.levelRange}
                  type="text"
                  value={levelMin}
                  placeholder="Min"
                  onChange={(e) => handleLevelChange(e, setLevelMin)}
                  onBlur={() =>
                    handleLevelBlur(
                      levelMin,
                      levelMax,
                      setLevelMin,
                      setLevelMax
                    )
                  }
                />
                <p>-</p>
                <input
                  name="maximum level"
                  className={styles.levelRange}
                  type="text"
                  value={levelMax}
                  placeholder="Max"
                  onChange={(e) => handleLevelChange(e, setLevelMax)}
                  onBlur={() =>
                    handleLevelBlur(
                      levelMin,
                      levelMax,
                      setLevelMin,
                      setLevelMax
                    )
                  }
                />
              </div>
              <div className={styles.buttonWrapper}>
                <div className={styles.topBtnContainer}>
                  <button className={styles.topBtn} type="button">
                    Search
                  </button>
                  <button
                    className={styles.topBtn}
                    type="button"
                    onClick={() => {
                      setLevelMin("");
                      setLevelMax("");
                      setName("");
                      setIsAnimating(true);
                      setTimeout(() => {
                        setDropdown(null);
                        setIsAnimating(false);
                      }, 400);
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
          <div ref={categorySectionRef} className={styles.categorySection}>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("weapons")}
              >
                Weapons
                <img
                  src={weaponsCategory}
                  alt="Weapons category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "weapons" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "weapons" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>One-handed swords</li>
                    <li>Two-handed swords</li>
                    <li>One-handed maces</li>
                    <li>Two-handed maces</li>
                    <li>One-handed axes</li>
                    <li>Two-handed axes</li>
                    <li>Daggers</li>
                    <li>Bows</li>
                    <li>Spears</li>
                    <li>Staves</li>
                    <li>Fist weapons</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("armor")}
              >
                Armor
                <img
                  src={armorCategory}
                  alt="Armor category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "armor" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "armor" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Heavy armor</li>
                    <li>Medium armor</li>
                    <li>Light armor</li>
                    <li>Shields</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("potions")}
              >
                Potions
                <img
                  src={potionsCategory}
                  alt="Potions category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "potions" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "potions" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Healing potions</li>
                    <li>Mana potions</li>
                    <li>Antidotes</li>
                    <li>Strength potions</li>
                    <li>Agility potions</li>
                    <li>Intellect potions</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("food")}
              >
                Food
                <img
                  src={foodCategory}
                  alt="Food category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "food" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "food" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Double XP for kills</li>
                    <li>Double XP for crafting</li>
                    <li>Movement speed</li>
                    <li>Elemental resistance</li>
                    <li>Physical resistance</li>
                    <li>Increase health</li>
                    <li>Increase mana</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("enchantments")}
              >
                Enchantments
                <img
                  src={enchantmentsCategory}
                  alt="Enchantments category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "enchantments" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "enchantments" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Flamebrand</li>
                    <li>Aquabane</li>
                    <li>Quakefury</li>
                    <li>Tempest edge</li>
                    <li>Storm's wrath</li>
                    <li>Necrotic touch</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("crafting tools")}
              >
                Crafting tools
                <img
                  src={craftingCategory}
                  alt="Crafting tools category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "crafting tools" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "crafting tools" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Hammers</li>
                    <li>Pickaxes</li>
                    <li>Carving knives</li>
                    <li>Flasks</li>
                    <li>Skinning knives</li>
                    <li>Shears</li>
                    <li>Engraving tools</li>
                    <li>Cooking pots</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("crafting materials")}
              >
                Crafting materials
                <img
                  src={craftingMaterialsCategory}
                  alt="Crafting materials category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "crafting materials" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "crafting materials" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Ore</li>
                    <li>Wood</li>
                    <li>Leather</li>
                    <li>Cloth</li>
                    <li>Herbs</li>
                    <li>Meat</li>
                    <li>Vegetables & fruits</li>
                    <li>Runestones</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("recipes")}
              >
                Recipes
                <img
                  src={recipesCategory}
                  alt="Recipes category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "recipes" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "recipes" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Blacksmithing recipes</li>
                    <li>Carpenting recipes</li>
                    <li>Leatherworking recipes</li>
                    <li>Clothing recipes</li>
                    <li>Runecrafting recipes</li>
                    <li>Alchemy recipes</li>
                    <li>Cooking recipes</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("bags")}
              >
                Bags
                <img
                  src={bagsCategory}
                  alt="Bags category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "bags" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "bags" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Regular backpacks</li>
                    <li>Crafting bags</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.categoryWrapper}>
              <button
                type="button"
                className={styles.category}
                onClick={() => toggleDropdown("quest items")}
              >
                Quest items
                <img
                  src={questItemsCategory}
                  alt="Quest items category"
                  className={styles.categoryIcon}
                />
              </button>
              {dropdown === "quest items" && (
                <div
                  className={`${styles.dropdown} ${
                    dropdown === "quest items" && !isAnimating
                      ? styles.open
                      : styles.closed
                  }`}
                >
                  <ul>
                    <li>Monster & animal parts</li>
                    <li>Collectibles</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.sellTab}>
          <div className={styles.classPortrait}>
            <img
              className={styles.classImg}
              src={portrait}
              alt="Class portrait"
            />
          </div>
          <div className={styles.createAuctionSection}>
            <h2 id={styles.createAuctionTitle}>Create Auction</h2>
            <div className={styles.auctionItem}>
              <h3 id={styles.auctionItemTitle}>Auction Item</h3>
              <div className={styles.auctionWrapper}>
                <div
                  className={`${styles.dropZone} ${
                    isDragging ? "dragging" : ""
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <img src={sellIcon} alt="Sell item" />
                  <div className={styles.hoverText}>Drag your item here!</div>
                </div>
                <div className={styles.itemName}>Item Name</div>
              </div>
            </div>
            <div className={styles.pricing}>
              <div className={styles.priceWrapper}>
                <h3 className={styles.priceDurationTitle}>Price & Duration</h3>
                <div className={styles.auctionDropdown}>
                  <select className={styles.auctionDropdownList}>
                    <option value="per stack">Per Stack</option>
                    <option value="per item">Per Item</option>
                  </select>
                  <select className={styles.auctionDropdownList}>
                    <option value="12 hours">12 Hours</option>
                    <option value="24 hours">24 Hours</option>
                    <option value="48 hours">48 Hours</option>
                  </select>
                </div>
              </div>
              <h3 className={styles.pricingTitle}>Starting Price</h3>
              <div className={styles.pricingWrapper}>
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Gold"
                  value={goldPrice}
                  onChange={(e) => handleGold(e, setGoldPrice)}
                />
                <img className={styles.coin} src={goldCoin} alt="Gold" />
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Silver"
                  value={silverPrice}
                  onChange={(e) => handleCopperSilver(e, setSilverPrice)}
                />
                <img className={styles.coin} src={silverCoin} alt="Silver" />
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Copper"
                  value={copperPrice}
                  onChange={(e) => handleCopperSilver(e, setCopperPrice)}
                />
                <img className={styles.coin} src={copperCoin} alt="Copper" />
              </div>
              <h3 className={styles.buyoutTitle}>Buyout Price</h3>
              <div className={styles.pricingWrapper}>
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Gold"
                  value={goldBuyout}
                  onChange={(e) => handleGold(e, setGoldBuyout)}
                />
                <img className={styles.coin} src={goldCoin} alt="Gold" />
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Silver"
                  value={silverBuyout}
                  onChange={(e) => handleCopperSilver(e, setSilverBuyout)}
                />
                <img className={styles.coin} src={silverCoin} alt="Silver" />
                <input
                  className={styles.currencyInput}
                  type="text"
                  placeholder="Copper"
                  value={copperBuyout}
                  onChange={(e) => handleCopperSilver(e, setCopperBuyout)}
                />
                <img className={styles.coin} src={copperCoin} alt="Copper" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${isBrowseFlashing ? styles.flash : ""}`}
          onClick={handleBrowse}
        >
          Browse
        </button>
        <button
          className={`${styles.tab} ${isSellFlashing ? styles.flash : ""}`}
          type="button"
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default Home;
