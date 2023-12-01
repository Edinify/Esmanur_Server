import React, { useState, useEffect } from "react";
import "./dateDropdown.css";
import { ReactComponent as DropdownArrowIcon } from "../../assets/icons/dashboard/arrow-down.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/dashboard/calendar.svg";

const DateDropdown = ({
  optionType,
  calendar,
  setOpenCalendar,
  openCalendar,
  applyMonthsFilter = () => {},
  applyFilterStars = () => {},
  openDropdown,
  setOpenDropdown,
  monthCount = ''
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const optionList = {
    date: {
      title: monthCount === 3 ? "Son 3 ay" : "Cari ay",
      data: [
        monthCount !== 3 && { key: 1, name: "Cari ay" },
        { key: 3, name: "Son 3 ay" },
        { key: 6, name: "Son 6 ay" },
        { key: 12, name: "İllik" },
        { key: "", name: "Tarix seç" },
      ],
    },
    stars: {
      title: "Dərslər",
      data: [
        { key: "starCount", name: "Ulduzlar" },
        { key: "lessonCount", name: "Dərslər" },
      ],
    },
  };
  
  const selectOption = (option) => {
    if(optionType !== 'stars') {
      if (option.name === "Tarix seç") {
        setOpenCalendar(!openCalendar);
        setSelectedOption(option);
      } else {
        setSelectedOption(option);
        setOpenDropdown(false);
        applyMonthsFilter(option);
      }
    } else {
      setSelectedOption(option);
      setOpenDropdown(false);
      applyFilterStars(option);
    }
  };
  const changeOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
    setOpenCalendar(false);
  };

  const closeDropdown = () => {
    setOpenCalendar(false)
    setOpenDropdown(false)
  }


  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div
      className={`date-filter-dropdown ${calendar ? "calendar-dropdown" : ""}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {calendar ? (
        <div
          className={`calendar ${openDropdown ? "active" : ""}`}
          onClick={() => changeOpenDropdown()}
        >
          <CalendarIcon />
        </div>
      ) : (
        <div onClick={() => changeOpenDropdown()} className="dropdown-head">
          <p>
            {selectedOption
              ? selectedOption.name
              : optionList[optionType].title}
          </p>
          <div className={`dropdown-icon ${openDropdown ? "up" : "down"}`}>
            <DropdownArrowIcon />
          </div>
        </div>
      )}

      <div className={`dropdown-body ${openDropdown ? "active" : ""}`}>
        <ul>
          {optionList[optionType].data.map((option, index) => (
            <li
              className={selectedOption.key === option.key ? "active" : ""}
              key={index}
              onClick={() => selectOption(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateDropdown;
