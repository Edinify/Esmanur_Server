import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  SHOWNAV_ACTION_TYPE,
  DROPDOWN_ERROR_TYPE
} from "../../redux/actions-type";
import { getFinanceChartAction } from "../../redux/actions/financeAction";
import { getFinanceDataAction } from "../../redux/actions/financeAction";
import moment from "moment";


export function useCustomHook() {
  const dispatch = useDispatch();
  const { financeMonthsFilter, financeChooseDate } = useSelector((state) => state.financeDateFilter);
  const startWeek = new Date();
  startWeek.setDate(startWeek.getDate() - (startWeek.getDay() === 0 ? 7 : startWeek.getDay()) +1);
  startWeek.setHours(0, 0, 0, 0);
  const endWeek = new Date();
  endWeek.setDate(startWeek.getDate() + 6);
  endWeek.setHours(0, 0, 0, 0);
  const weeksArr = ["", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
  const lessonHours = [
    {
      first_time: "08:30",
      second_time: "10:00",
    },
    {
      first_time: "10:00",
      second_time: "11:30",
    },
    {
      first_time: "11:30",
      second_time: "13:00",
    },
    {
      first_time: "13:00",
      second_time: "14:30",
    },
    {
      first_time: "14:30",
      second_time: "16:00",
    },
    {
      first_time: "16:00",
      second_time: "17:30",
    },
    {
      first_time: "17:30",
      second_time: "19:00",
    },
    {
      first_time: "19:30",
      second_time: "20:00",
    },
  ];

  const changeDropdownNameErr = (value) => {
    dispatch({type:DROPDOWN_ERROR_TYPE.GET_DROPDOWN_ERROR,payload:value})
  }
  const getFinanceDataAfterCreate = () => {
    if (financeChooseDate?.startDate && financeChooseDate?.endDate) {
      const start = moment(financeChooseDate?.startDate).format("YYYY-MM");
      const end = moment(financeChooseDate?.endDate).format("YYYY-MM");
      dispatch(getFinanceChartAction(start, end, ""));
      dispatch(getFinanceDataAction(start, end, ''));
    } else  if (financeMonthsFilter) {
      dispatch(getFinanceDataAction("", "", financeMonthsFilter))
      if (financeMonthsFilter === 1) {
        dispatch(getFinanceChartAction("", "", 3));
      } else {
        dispatch(getFinanceChartAction("", "", financeMonthsFilter));
      }
    } else {
      dispatch(getFinanceChartAction("", "", 3));
      dispatch(getFinanceDataAction("", "", 1))
    }
  }

  return { 
    startWeek, 
    endWeek,
    lessonHours,
    weeksArr,
    changeDropdownNameErr,
    getFinanceDataAfterCreate
  };
}