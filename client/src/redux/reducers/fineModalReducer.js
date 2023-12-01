import { FINE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  fineModalData: { teacher: "", comment: "", fineType: "" },
  fineOpenModal: false,
  fineModalLoading: false,
};

export const fineModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL:
      return {
        ...state,
        fineModalData: action.payload.data,
        fineOpenModal: action.payload.openModal,
      };
      case FINE_MODAL_ACTION_TYPE.FINE_OPEN_MODAL:
        return{
          ...state,
          fineOpenModal:action.payload
        }
    case FINE_MODAL_ACTION_TYPE.FINE_MODAL_LOADING:
      return {
        ...state,
        fineModalLoading: action.payload,
      };
    default:
      return state;
  }
};
