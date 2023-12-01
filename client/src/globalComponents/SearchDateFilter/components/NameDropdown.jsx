import React, { useState, useEffect } from "react";
import "./dropdownName.css";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";

const NameDropdown = ({ categoryData, changeCategory }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const getCategory = (category) => {
    setSelectedCategory(category);
    setOpenDropdown(false);
    changeCategory(category);
  };

  return (
    <div
      className={`global-category-dropdown name-dropdown ${
        openDropdown ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <h2>
          {selectedCategory ? selectedCategory.name : "Bütün kateqoriyalar"}
        </h2>{" "}
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {categoryData.map((item, index) => (
            <li key={index} onClick={() => getCategory(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameDropdown;
