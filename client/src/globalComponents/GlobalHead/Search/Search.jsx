import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search-normal-new.svg";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../redux/actions-type";

const Search = ({
  searchData,
  dataSearchValues,
  className,
  DATA_SEARCH_VALUE,
}) => {
  const dispatch = useDispatch();
  return (
    <form onSubmit={(e) => searchData(e)} className={className}>
      <div className="input-box">
        <div className="search-icon" onClick={searchData}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Axtar"
          onChange={(e) =>
            dispatch({
              type: SEARCH_VALUES_ACTION_TYPES[DATA_SEARCH_VALUE],
              payload: e.target.value,
            })
          }
          value={dataSearchValues ? dataSearchValues : ""}
        />
      </div>
    </form>
  );
};

export default Search;
