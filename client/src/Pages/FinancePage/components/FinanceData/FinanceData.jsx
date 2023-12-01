import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomePaginationAction } from "../../../../redux/actions/incomeActions";
import { getExpensesPaginationAction } from "../../../../redux/actions/expensesAction";
import { getFoodRationPaginationAction } from "../../../../redux/actions/foodRationAction";
import { getUniformsPaginationAction } from "../../../../redux/actions/uniformsAction";
import {
  EXPENSES_ACTION_TYPE,
  INCOME_ACTION_TYPE,
  FOOD_RATION_ACTION_TYPE,
  UNIFORMS_ACTION_TYPE,
} from "../../../../redux/actions-type";
import IncomesData from "./IncomesData/IncomesData";
import ExpensesData from "./ExpensesData/ExpensesData";
import FoodRationData from "./FoodRation/FoodRation";
import UniformsData from "./UniformsData/UniformsData";
import StudentPayments from "./StudentPayments/StudentPayments";

const FinanceData = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { financeMonthsFilter, financeChooseDate } = useSelector(
    (state) => state.financeDateFilter
  );
  const { lastPage: incomesLastPage } = useSelector((state) => state.incomes);
  const { lastPage: expensesLastPage } = useSelector(
    (state) => state.expensesData
  );
  const { lastPage: foodRationLastPage } = useSelector(
    (state) => state.foodRationData
  );
  const { lastPage: uniformsLastPage } = useSelector(
    (state) => state.uniformsData
  );

  const getPageNumberIncomes = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };
  const getDateFilteredIncomes = (pageNumber) => {
    dispatch({
      type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getIncomePaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "" //month
      )
    );
  };
  const getMonthFilteredIncomes = (pageNumber) => {
    dispatch({
      type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getIncomePaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1 //month
      )
    );
  };

  const getPageNumberExpenses = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };
  const getDateFilteredExpenses = (pageNumber) => {
    dispatch({
      type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getExpensesPaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "" //month
      )
    );
  };
  const getMonthFilteredExpenses = (pageNumber) => {
    dispatch({
      type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getExpensesPaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1 //month
      )
    );
  };

  const getPageNumberFoodRation = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getFoodRationPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch({
        type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getFoodRationPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };
  const getDateFilteredFoodRation = (pageNumber) => {
    dispatch({
      type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getFoodRationPaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "" //month
      )
    );
  };
  const getMonthFilteredFoodRation = (pageNumber) => {
    dispatch({
      type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getFoodRationPaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1 //month
      )
    );
  };

  const getPageNumberUniforms = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getUniformsPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch({
        type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getUniformsPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };
  const getDateFilteredUniforms = (pageNumber) => {
    dispatch({
      type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getUniformsPaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "" //month
      )
    );
  };
  const getMonthFilteredUniforms = (pageNumber) => {
    dispatch({
      type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getUniformsPaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1 //month
      )
    );
  };

  useEffect(() => {
    if (financeChooseDate?.startDate && financeChooseDate?.endDate) {
      getDateFilteredIncomes(incomesLastPage);
      getDateFilteredExpenses(expensesLastPage);
      getDateFilteredFoodRation(foodRationLastPage);
      getDateFilteredUniforms(uniformsLastPage);
    }
  }, [financeChooseDate]);

  useEffect(() => {
    if (financeMonthsFilter) {
      getMonthFilteredIncomes(incomesLastPage);
      getMonthFilteredExpenses(expensesLastPage);
      getMonthFilteredFoodRation(foodRationLastPage);
      getMonthFilteredUniforms(uniformsLastPage);
    }
  }, [financeMonthsFilter]);

  useEffect(() => {
    dispatch(getIncomePaginationAction(1, "", "", 1));
    dispatch(getExpensesPaginationAction(1, "", "", 1));
    dispatch(getFoodRationPaginationAction(1, "", "", 1));
    dispatch(getUniformsPaginationAction(1, "", "", 1));
  }, []);

  return (
    <div>
      {location.pathname === "/finance/incomes" && (
        <IncomesData getPageNumber={getPageNumberIncomes} />
      )}
      {location.pathname === "/finance/expenses" && (
        <ExpensesData getPageNumber={getPageNumberExpenses}/>
      )}
      {location.pathname === "/finance/food-ration" && (
        <FoodRationData
          getPageNumber={getPageNumberFoodRation}
        />
      )}
      {location.pathname === "/finance/uniforms" && (
        <UniformsData getPageNumber={getPageNumberUniforms} />
      )}
      {location.pathname === "/finance/student-payments" && (
        <StudentPayments
          getPageNumber={getPageNumberUniforms}
        />
      )}
    </div>
  );
};

export default FinanceData;
