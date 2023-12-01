import { INCOMES_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  incomesModalData: {
    category: "",
    appointment: "",
    unitMeasurement: "",
    // quantity:"",
    unitPrice: "",
    recipient: "",
    amount: "",
    date: "",
    paymentMethod: "",
    imx: "",
  },
  incomesOpenModal: false,
  incomesModalLoading: false,
};

export const incomesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL:
      return {
        ...state,
        incomesModalData: action.payload.data,
        incomesOpenModal: action.payload.openModal,
      };
    case INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL:
      return {
        ...state,
        incomesOpenModal: action.payload,
      };
    case INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_LOADING:
      return {
        ...state,
        incomesModalLoading: action.payload,
      };
    default:
      return state;
  }
};
