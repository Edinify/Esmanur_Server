import { FINANCE_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  financeMonthsFilter: "",
  financeChooseDate: "",

  financeIncomeCategory: "",
  financeIncomeSorting: "",

  financeExpenseCategory: "",
  financeExpenseSorting: "",
};

export const financeFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINANCE_FILTER_ACTION_TYPE.CLEAR_MONTHS_FILTER:
      return {
        ...state,
        financeMonthsFilter: "",
      };
    case FINANCE_FILTER_ACTION_TYPE.CLEAR_CHOOSE_DATE_FILTER:
      return {
        ...state,
        financeChooseDate: "",
      };
    case FINANCE_FILTER_ACTION_TYPE.GET_CHOOSE_DATE_FILTER:
      return {
        ...state,
        financeChooseDate: action.payload?.financeChooseDate,
        financeMonthsFilter: "",
      };
    case FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER:
      return {
        ...state,
        financeChooseDate: "",
        financeMonthsFilter: action.payload.financeMonthsFilter,
      };
    // INCOME
    case FINANCE_FILTER_ACTION_TYPE.GET_INCOME_CATEGORY_FILTER:
      return {
        ...state,
        financeIncomeCategory: action.payload.financeIncomeCategory,
      };
    case FINANCE_FILTER_ACTION_TYPE.GET_INCOME_SORTING_FILTER:
      return {
        ...state,
        financeIncomeSorting: action.payload.financeIncomeSorting,
      };

      
    // EXPENSE
    case FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_CATEGORY_FILTER:
      return {
        ...state,
        financeExpenseCategory: action.payload.financeExpenseCategory,
      };
    case FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_SORTING_FILTER:
      return {
        ...state,
        financeExpenseSorting: action.payload.financeExpenseSorting,
      };
    default:
      return state;
  }
};
