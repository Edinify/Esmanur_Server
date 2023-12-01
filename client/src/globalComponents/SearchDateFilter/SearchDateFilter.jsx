import React, { useEffect, useState } from "react";
import "./searchDateFilter.css";
import { DatePick } from "../DatePicker/DatePicker";
import DatePickerModal from "../Modals/DatePickerModal/DatePickerModal";
import Search from "./components/Search";
import ApplyClearBtns from "./components/ApplyClearBtns";
import DatePickBtn from "../../globalComponents/DatePickBtn/DatePickBtn";
import CategoryDropdown from "./components/CategoryDropdown";

const SearchDateFilter = ({
  className,
  clearAll,
  applyFilter,
  searchValue,
  changeSearchValue,
  searchData,
  color,
  category = false,
  categoryData = [],
  changeCategory = () => {},
}) => {
  const [datePickModal, setDatePickModal] = useState(false);

  return (
    <div className={className}>
      <div className="container">
        <div className={`search-date-filter ${color} ${category ? 'category' : 'none-category'}`}>
          <div className="left">
            <Search
              searchData={searchData}
              changeSearchValue={changeSearchValue}
              searchValue={searchValue}
            />
            {category && <CategoryDropdown categoryData={categoryData} changeCategory={changeCategory}/>}
          </div>
          <div className="right">
            <DatePick />
            {category && <CategoryDropdown categoryData={categoryData} changeCategory={changeCategory}/>}
            <ApplyClearBtns clearAll={clearAll} applyFilter={applyFilter} />
            <DatePickBtn setDatePickModal={setDatePickModal} />
          </div>
          {datePickModal && (
            <DatePickerModal
              applyFilter={applyFilter}
              setDatePickModal={setDatePickModal}
              clearAll={clearAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDateFilter;
