import { EXPENSES_ACTION_TYPE } from "../actions-type/index";

const initialState = {
  expensesData: [],
  loading: false,
  totalPages: 1,
  lastPage: 1,
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSES_ACTION_TYPE.GET_EXPENSES:
      return {
        ...state,
        expensesData: action.payload.expenses,
        totalPages: action.payload.totalPages,
      };

    case EXPENSES_ACTION_TYPE.GET_EXPENSES_PAGINATION:
      return {
        ...state,
        expensesData: action.payload.expenses,
        totalPages: action.payload.totalPages,
      };
    case EXPENSES_ACTION_TYPE.EXPENSES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EXPENSES_ACTION_TYPE.CREATE_EXPENSES:
      return {
        ...state,
        expensesData: [...state?.expensesData, action.payload],
      };
    case EXPENSES_ACTION_TYPE.UPDATE_EXPENSES:
      return {
        ...state,
        expensesData: state?.expensesData?.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };

    case EXPENSES_ACTION_TYPE.DELETE_EXPENSES:
      return {
        ...state,
        expensesData: state?.expensesData?.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE:
      return {
        ...state,
        loading: false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
