import { BONUS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  bonusModalData: { teacher: "", comment: "", amount: "" },
  bonusOpenModal: false,
  bonusesModalLoading: false,
};

export const bonusModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL:
      return {
        ...state,
        bonusModalData: action.payload.data,
        bonusOpenModal: action.payload.openModal,
      };
    case BONUS_MODAL_ACTION_TYPE.BONUS_OPEN_MODAL:
      return {
        ...state,
        bonusOpenModal: action.payload,
      };
      case BONUS_MODAL_ACTION_TYPE.BONUS_MODAL_LOADING:
        return {
          ...state,
          bonusesModalLoading: action.payload,
        };
    default:
      return state;
  }
};
