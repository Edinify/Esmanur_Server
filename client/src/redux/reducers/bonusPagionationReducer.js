import { BONUS_PAGINATION_ACTION_TYPE } from "../actions-type";

const initialState = {
  bonusData: [],
  loading: false,
  totalPages: 1,
  lastPage: "",
  // openBonusModal: false,
};

export const bonusPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    // case BONUS_PAGINATION_ACTION_TYPE.GET_BONUS:
    //   return {
    //     ...state,
    //     bonusData: action.payload,
    //     totalPages: action.payload.totalPages,
    //     loading: false,
    //   };
    case BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_PAGINATION:
      return {
        ...state,
        bonusData: action.payload.bonuses,
        totalPages: action.payload.totalPages,
      };
    case BONUS_PAGINATION_ACTION_TYPE.CREATE_BONUS:
      return {
        ...state,
        bonusData: [...state.bonusData, action.payload],
      };
    case BONUS_PAGINATION_ACTION_TYPE.UPDATE_BONUS:
      return {
        ...state,
        bonusData: state.bonusData.map((bonus) =>
          bonus._id === action.payload._id ? action.payload : bonus
        ),
      };
    case BONUS_PAGINATION_ACTION_TYPE.DELETE_BONUS:
      return {
        ...state,
        bonusData: state.bonusData.filter(
          (bonus) => bonus._id !== action.payload._id
        ),
      };
    case BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_LAST_PAGE:
      return {
        // ...state,
        // loading: false,
        lastPage: action.payload,
      };
    case BONUS_PAGINATION_ACTION_TYPE.BONUS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
