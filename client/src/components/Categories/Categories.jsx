import React from "react";
import styles from "./CategoriesStyles.module.css";
import swordsmanImage from "../../assets/swordsman.png";
import magicianImage from "../../assets/magician.png";
import thiefImage from "../../assets/thief.png";
import spearmanImage from "../../assets/dragon.png";
import druidImage from "../../assets/druid.png";
import priestImage from "../../assets/priest.png";
import archerImage from "../../assets/bow.png";
import samuraiImage from "../../assets/samurai.png";
import martialArtistImage from "../../assets/martial.png";
import barbarianImage from "../../assets/barbarian.png";

const categories = [
  { name: "Swordsman", image: swordsmanImage },
  { name: "Magician", image: magicianImage },
  { name: "Thief", image: thiefImage },
  { name: "Spearman", image: spearmanImage },
  { name: "Druid", image: druidImage },
  { name: "Priest", image: priestImage },
  { name: "Archer", image: archerImage },
  { name: "Samurai", image: samuraiImage },
  { name: "Martial-artist", image: martialArtistImage },
  { name: "Barbarian", image: barbarianImage },
];

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h1>Select Class</h1>
      <div className={styles.categoryContainer}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryItem}>
            <img
              src={category.image}
              alt={category.name}
              className={styles.categoryImage}
            />
            <h3 className={styles.categoryName}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
