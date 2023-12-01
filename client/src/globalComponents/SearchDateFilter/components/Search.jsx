import React from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search-normal-20.svg";

const Search = ({
  searchData,
  changeSearchValue,
  searchValue,
  
}) => {

  return (
    <form onSubmit={(e) => searchData(e)} className="search-form">
        <div className="input-box">
          <div className="search-icon" onClick={searchData}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Axtar"
            value={searchValue ? searchValue : ""}
            onChange={(e) => changeSearchValue(e)}
          />
        </div>

    </form>
  );
};

export default Search;
