import { EXPENSES_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  expensesModalData: { category: "", appointment: "", amount: "", date: "" },
  expensesOpenModal: false,
  expensesModalLoading: false,
};

export const expensesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL:
      return {
        ...state,
        expensesModalData: action.payload.data,
        expensesOpenModal: action.payload.openModal,
      };
    case EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL:
      return {
        ...state,
        expensesOpenModal: action.payload,
      };
    case EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_LOADING:
      return {
        ...state,
        expensesModalLoading: action.payload,
      };
    default:
      return state;
  }
};
