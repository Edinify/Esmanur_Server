import React, { useState, useEffect } from "react";
import "./dropdownName.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../assets/icons/Checkbox.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-normal.svg";
import { useSelector, useDispatch } from "react-redux";
import { getTeachersAction, getTeachersActiveAction } from "../../redux/actions/teachersActions";
import { getStudentsAction } from "../../redux/actions/studentsActions";
import {
  DROPDOWN_NAME_ACTION_TYPE,
  DATEPICKER_ACTION_TYPE,
  PAGINATION_PAGE_NUMBER_ACTION_TYPE,
} from "../../redux/actions-type";
import { useCustomHook } from "../GlobalFunctions/globalFunctions";

export const DropdownName = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { changeDropdownNameErr } = useCustomHook();
  const { students, loading, studentsByMore } = useSelector((state) => state.studentsPagination);
  const { teachers } = useSelector((state) => state.teachersPagination);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { dropdownNameError } = useSelector((state) => state.dropdownNameError);
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchedValue, setSearcherValue] = useState("");
  const [searchFilter, setSearchFilter] = useState('')
  const [selectedName, setSelectedName] = useState("");

  const nameData =
    mainpageType === "teacher"
      ? teachers?.filter((teacher) => teacher)
      : studentsByMore?.filter((student) => student);

  const clearFiltersForLesson = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/student" ||
      location.pathname === "/temporary-table"
    ) {
      dispatch({
        type: DATEPICKER_ACTION_TYPE.START_DATE,
        payload: "",
      });
      dispatch({
        type: DATEPICKER_ACTION_TYPE.END_DATE,
        payload: "",
      });
      dispatch({
        type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
        payload: 0,
      });
    }
  };
  const changeDropdownName = (data) => {
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: data });
    setSelectedName(data.fullName);
    setDropdownOpen(false);
    setTimeout(() => {
      setSearcherValue("");
      setSearchFilter("")
      if (mainpageType === "student") {
        dispatch(getStudentsAction({ studentsCount: 0, searchQuery: "" }));
      }
    }, 500);
    clearFiltersForLesson();
  };
  const changeOpenDropdown = () => {
    if (dropdownOpen) {
      if (!selectedName && dropdownName) {
        setSelectedName(dropdownName.fullName);
      }
      setTimeout(() => {
        setSearcherValue("");
        setSearchFilter("")
        if (mainpageType === "student") {
          dispatch(getStudentsAction({ studentsCount: 0, searchQuery: "" }));
        }
      }, 500);
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };
  const getSearchValue = (e) => {
    setDropdownOpen(true);
    setSearcherValue(e.target.value);
    setSelectedName("");
  };
  const searchData = (e) => {
    e.preventDefault();
    if (mainpageType === "student") {
      dispatch(
        getStudentsAction({
          studentsCount: 0,
          searchQuery: searchedValue ? searchedValue : "",
        })
      );
    } else {
      setSearchFilter(searchedValue)
    }
  };
  const getMoreData = () => {
    dispatch(
      getStudentsAction({
        studentsCount: studentsByMore?.length ? studentsByMore?.length : 0,
        searchQuery: searchedValue ? searchedValue : "",
      })
    );
  };

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(getTeachersAction());
    } else {
      dispatch(getTeachersActiveAction());
    }
    dispatch(getStudentsAction({ studentsCount: 0, searchQuery: "" }));
  }, []);

  useEffect(() => {
    changeDropdownNameErr(false);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: "" });
    setSearcherValue("");
    setSearchFilter('')
    setSelectedName("");
  }, [location.pathname]);

  useEffect(() => {
    if (dropdownName) {
      changeDropdownNameErr(false);
    }
  }, [dropdownName]);

  // console.log(loading);
  // console.log(studentsByMore);

  return (
    <div
      className={`global-category-dropdown dropdown-name name ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <form onSubmit={(e) => searchData(e)} className="dropdown-head">
        <div className="search-icon" onClick={(e) => searchData(e)}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder={
            mainpageType === "teacher" ? "Müəllim adı" : "Tələbə adı"
          }
          onChange={(e) => getSearchValue(e)}
          value={selectedName ? selectedName : searchedValue}
          // value={searchedValue}
        />
        <div className="arrow-icon" onClick={() => changeOpenDropdown()}>
          <ArrowIcon />
        </div>
      </form>

      <div className="dropdown-body">
        {mainpageType === "teacher" && (
          <ul>
            {nameData
              ?.filter((item) =>
                item.fullName
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase())
              )
              .map((item, i) => {
                const { fullName, _id, courses, deleted } = item;
                return (
                  <li
                    key={i}
                    onClick={() =>
                      changeDropdownName({
                        fullName,
                        _id,
                        courses,
                        deleted,
                      })
                    }
                    className={deleted ? "deleted" : ""}
                  >
                    {dropdownName && dropdownName._id === _id && <CheckIcon />}
                    {fullName}
                  </li>
                );
              })}
          </ul>
        )}

        {mainpageType === "student" && (
          <ul>
            {nameData?.map((item, i) => {
              const { fullName, _id, courses, deleted } = item;
              return (
                <li
                  key={i}
                  onClick={() =>
                    changeDropdownName({
                      fullName,
                      _id,
                      courses,
                      deleted,
                    })
                  }
                  className={deleted ? "deleted" : ""}
                >
                  {dropdownName && dropdownName._id === _id && <CheckIcon />}
                  {fullName}
                </li>
              );
            })}
            <li>
              <button
                onClick={() => getMoreData()}
                className="more-btn"
                disabled={loading}
              >
                {loading ? "yüklənir..." : "daha cox"}
              </button>
            </li>
          </ul>
        )}
      </div>

      {dropdownNameError && (
        <small className="err-message">Zəhmət olmasa ilk öncə ad seçin.</small>
      )}
    </div>
  );
};
