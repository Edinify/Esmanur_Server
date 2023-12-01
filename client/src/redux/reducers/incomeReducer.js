import { INCOME_ACTION_TYPE } from "../actions-type";

const initialState = {
  incomes: [],
  loading: false,
  totalPages:1,
  lastPage:1,
};

export const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCOME_ACTION_TYPE.GET_INCOME:
      return {
        ...state,
        incomes: action.payload.incomes,
        totalPages:action.payload.totalPages,
        // loading:false
      };
      case INCOME_ACTION_TYPE.GET_INCOME_PAGINATION:
        return{
          ...state,
          incomes:action.payload.incomes,
          totalPages:action.payload.totalPages,
        }

    case INCOME_ACTION_TYPE.UPDATE_INCOME:
      return {
        ...state,
        incomes: state.incomes.map((income) =>
          income._id === action.payload._id ? action.payload : income
        ),
      };
    case INCOME_ACTION_TYPE.CREATE_INCOME:
      return {
        ...state,
        incomes: [...state?.incomes, action.payload],
      };
    case INCOME_ACTION_TYPE.DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(
          (income) => income._id !== action.payload._id
        ),
      };
    case INCOME_ACTION_TYPE.INCOME_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE:
        return{
          ...state,
          loading:false,
          lastPage:action.payload
        }

    default:
      return state;
  }
};
