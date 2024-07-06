import React from "react";
import { heroCategories } from "../constants";

const Hero = () => {
  return (
    <div id="hero">
      <h2 className="hero-heading poppins-semibold">
        <span className="logo">Eventure</span> - from dream events to
        unforgettable memories <br />
        discover, create, celebrate
      </h2>
      <div className="category-list">
        {heroCategories.map((category, key) => (
          <div key={key} className="category-container">
              <p>{category.label}</p>
              {category.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
