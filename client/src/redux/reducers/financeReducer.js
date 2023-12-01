import { FINANCE_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  financeChart: {},
  financeData: {},
};

export const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINANCE_ACTIONS_TYPE.GET_FINANCE_CHART:
      return {
        ...state,
        financeChart: action.payload,
      };
    case FINANCE_ACTIONS_TYPE.GET_FINANCE_DATA:
      return {
        ...state,
        financeData: action.payload,
      };
    default:
      return state;
  }
};
