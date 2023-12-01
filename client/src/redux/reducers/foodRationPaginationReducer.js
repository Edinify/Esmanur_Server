import { FOOD_RATION_ACTION_TYPE } from "../actions-type/index";

const initialState = {
  foodRationData: [],
  loading: false,
  totalPages: 1,
  lastPage: 1,
  // openExpenseModal:false
};

export const foodRationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION:
      return {
        ...state,
        foodRationData: action.payload.foods,
        totalPages: action.payload.totalPages,
        // loading: false,
      };

    case FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_PAGINATION:
      return {
        ...state,
        foodRationData: action.payload.foods,
        totalPages:action.payload.totalPages,
      };
    case FOOD_RATION_ACTION_TYPE.FOOD_RATION_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FOOD_RATION_ACTION_TYPE.CREATE_FOOD_RATION:
      return {
        ...state,
        foodRationData: [...state?.foodRationData, action.payload],
      };
    case FOOD_RATION_ACTION_TYPE.UPDATE_FOOD_RATION:
      return {
        ...state,
        foodRationData: state?.foodRationData?.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };

    case FOOD_RATION_ACTION_TYPE.DELETE_FOOD_RATION:
      return {
        ...state,
        foodRationData: state?.foodRationData?.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE:
      return {
        ...state,
        loading:false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
