import { FINE_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  fineCategory: "",
};

export const fineFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINE_FILTER_ACTION_TYPE.GET_FINE_CATEGORY:
      return {
        ...state,
        fineCategory: action.payload,
      };
    default:
      return state;
  }
};
