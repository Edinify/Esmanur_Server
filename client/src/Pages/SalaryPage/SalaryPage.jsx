import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DATEPICKER_ACTION_TYPE, DROPDOWN_NAME_ACTION_TYPE, PAGINATION_PAGE_NUMBER_ACTION_TYPE, SEARCH_VALUES_ACTION_TYPES } from "../../redux/actions-type";
import { getSalaryPaginationAction } from "../../redux/actions/salaryActions";
import SalaryData from "./components/SalaryData/SalaryData";
import SearchDateFilter from "../../globalComponents/SearchDateFilter/SearchDateFilter";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const SalaryPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { salariesSearchValues } = useSelector((state) => state.searchValues);
  const [filter, setFilter] = useState(false);
  const [salaryPageNum, setSalaryPageNum] = useState(1);
  
const clearFilter = () => {
    return (dispatch)=>{
    dispatch({type:DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN,payload:''})
    dispatch({type:DATEPICKER_ACTION_TYPE.START_DATE, payload: '' });
    dispatch({type:DATEPICKER_ACTION_TYPE.END_DATE, payload: '' });
    dispatch({type:PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,payload:0});
    }
}
  const getPageNumber = (pageNumber) => {
    setSalaryPageNum(pageNumber);
    if (salariesSearchValues) {
      dispatch(
        getSalaryPaginationAction(
          "",
          startDate ? startDate : "",
          endDate ? endDate : "",
          pageNumber,
          salariesSearchValues
        )
      );
    } else {
      dispatch(
        getSalaryPaginationAction(
          "",
          startDate ? startDate : "",
          endDate ? endDate : "",
          pageNumber,
          ""
        )
      );
    }
  };
  const searchSalary = (e) => {
    e.preventDefault();
    clearFilter()
    dispatch(getSalaryPaginationAction("", "", "", 1, salariesSearchValues));
    setSalaryPageNum(1);
  };
  const clearAll = () => {
    clearFilter()
    dispatch(getSalaryPaginationAction("", "", "", 1, ""));
    setSalaryPageNum(1);
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.SALARIES_SEARCH_VALUE,
      payload: "",
    });
  };
  const applySalaryFilter = () => {
    setSalaryPageNum(1);
    if (salariesSearchValues) {
      dispatch(
        getSalaryPaginationAction(
          "",
          startDate,
          endDate,
          1,
          salariesSearchValues
        )
      );
    } else {
      dispatch(getSalaryPaginationAction("", startDate, endDate, 1, ""));
    }

    setFilter(false);
  };
  const changeSearchValue = (e) => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.SALARIES_SEARCH_VALUE,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    if (filter) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [filter]);

  return (
    <>
      <div className="details-page salary-page">
        <SearchDateFilter
          className="salary-head"
          clearAll={clearAll}
          applyFilter={applySalaryFilter}
          changeSearchValue={changeSearchValue}
          searchValue={salariesSearchValues}
          searchData={searchSalary}
          color="white"
        />

        <SalaryData
          salaryPageNum={salaryPageNum}
          getPageNumber={getPageNumber}
        />
      </div>
    </>
  );
};

export default SalaryPage;
