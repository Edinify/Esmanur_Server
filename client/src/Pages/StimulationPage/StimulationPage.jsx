import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_VALUES_ACTION_TYPES,
  FINE_FILTER_ACTION_TYPE,
} from "../../redux/actions-type";
import StimulationHeader from "./components/StimulationHeader/StimulationHeader";
import StimulationData from "./components/StimulationData/StimulationData";
import { clearSearchValue } from "../../redux/actions/clearSearchValueAction";
import { getBonusPaginationAction } from "../../redux/actions/bonusActions";
import { getFinePaginationAction } from "../../redux/actions/fineActions";
import SearchDateFilter from "../../globalComponents/SearchDateFilter/SearchDateFilter";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const StimulationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lastPage: bonusLastPage } = useSelector((state) => state.bonusData);
  const { lastPage: fineLastPage } = useSelector((state) => state.fineData);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { fineCategory } = useSelector((state) => state.fineCategory);
  const { bonusSearchValues, fineSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const [bonusPageNum, setBonusPageNum] = useState(1);
  const [finePageNum, setFinePageNum] = useState(1);
  const fineTypes = [
    { key: "all", name: "Bütün cərimələr" },
    { key: "verbalWarning", name: "Şifahi xəbərdarlıq" },
    { key: "writtenWarning", name: "Yazılı xəbərdarlıq" },
    { key: "rebuke", name: "Töhmət" },
    { key: "severeRebuke", name: "Şiddətli töhmət" },
  ];

  const clearAll = () => {
    dispatch(clearSearchValue());
    if (location.pathname === "/stimulations/bonus") {
      dispatch(getBonusPaginationAction(1, "", "", ""));
      setBonusPageNum(1);
    } else {
      dispatch(getFinePaginationAction("", "", "", 1, ""));
      setFinePageNum(1);
    }
  };

  const searchBonusData = (e) => {
    e.preventDefault();
    dispatch(
      getBonusPaginationAction(
        1,
        bonusSearchValues,
        startDate ? startDate : "",
        endDate ? endDate : ""
      )
    );
    setBonusPageNum(1);
  };
  const searchFineData = (e) => {
    e.preventDefault();
    dispatch(
      getFinePaginationAction(
        startDate ? startDate : "",
        endDate ? endDate : "",
        fineSearchValues,
        1,
        fineCategory ? (fineCategory !== "all" ? fineCategory : "") : ""
      )
    );
    setFinePageNum(1);
  };
  const getPageNumberBonus = (pageNumber) => {
    setBonusPageNum(pageNumber);
    dispatch(
      getBonusPaginationAction(
        pageNumber,
        bonusSearchValues ? bonusSearchValues : "",
        startDate ? startDate : "",
        endDate ? endDate : ""
        // page
        // searchQuery
        // startDate
        // endDate
      )
    );
  };
  const getPageNumberFine = (pageNumber) => {
    setFinePageNum(pageNumber);
    dispatch(
      getFinePaginationAction(
        startDate ? startDate : "",
        endDate ? endDate : "",
        fineSearchValues ? fineSearchValues : "",
        pageNumber,
        fineCategory ? (fineCategory !== "all" ? fineCategory : "") : ""
        // startDate
        // endDate
        // searchQuery
        // page
        // category
      )
    );
  };
  const applyFilterFine = () => {
    dispatch(
      getFinePaginationAction(
        startDate ? startDate : "",
        endDate ? endDate : "",
        fineSearchValues ? fineSearchValues : "",
        1,
        fineCategory ? (fineCategory !== "all" ? fineCategory : "") : ""
      )
    );
  };
  const applyFilterBonus = () => {
    dispatch(
      getBonusPaginationAction(
        1,
        bonusSearchValues ? bonusSearchValues : "",
        startDate ? startDate : "",
        endDate ? endDate : ""
      )
    );
  };
  const changeSearchValueBonus = (e) => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE,
      payload: e.target.value,
    });
  };
  const changeSearchValueFine = (e) => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.FINE_SEARCH_VALUE,
      payload: e.target.value,
    });
  };
  const changeFineType = (fineType) => {
    dispatch({
      type: FINE_FILTER_ACTION_TYPE.GET_FINE_CATEGORY,
      payload: fineType.key,
    });
  };
  useEffect(() => {
    getPageNumberFine(1);
  }, [fineCategory]);

  useEffect(() => {
    if (fineLastPage) {
      setFinePageNum(fineLastPage);
    }
  }, [fineLastPage]);

  useEffect(() => {
    if (bonusLastPage) {
      setBonusPageNum(bonusLastPage);
    }
  }, [bonusLastPage]);

  useEffect(() => {
    setFinePageNum(1);
    setBonusPageNum(1);
  }, [location.pathname]);

  return (
    <div className="stimulations-page">
      <StimulationHeader />

      {location.pathname === "/stimulations/fine" && (
        <SearchDateFilter
          className="stimulation-search-head"
          clearAll={clearAll}
          applyFilter={applyFilterFine}
          changeSearchValue={changeSearchValueFine}
          searchValue={fineSearchValues}
          searchData={searchFineData}
          color="gray"
          category={true}
          categoryData={fineTypes}
          changeCategory={changeFineType}
        />
      )}
      {location.pathname === "/stimulations/bonus" && (
        <SearchDateFilter
          className="stimulation-search-head"
          clearAll={clearAll}
          applyFilter={applyFilterBonus}
          changeSearchValue={changeSearchValueBonus}
          searchValue={bonusSearchValues}
          searchData={searchBonusData}
          color="gray"
        />
      )}

      <StimulationData
        getPageNumberFine={getPageNumberFine}
        getPageNumberBonus={getPageNumberBonus}
        bonusPageNum={bonusPageNum}
        finePageNum={finePageNum}
      />
    </div>
  );
};

export default StimulationPage;
