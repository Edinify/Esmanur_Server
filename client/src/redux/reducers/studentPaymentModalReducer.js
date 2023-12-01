import { STUDENT_PAYMENT_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  studentPaymentModalData: { category: "", appointment: "", amount: "", date: "" },
  studentPaymentOpenModal: false,
  studentPaymentModalLoading: false,
};

export const studentPaymentModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_PAYMENT_MODAL_ACTION_TYPE.GET_STUDENT_PAYMENT_MODAL:
      return {
        ...state,
        studentPaymentModalData: action.payload.data,
        studentPaymentOpenModal: action.payload.openModal,
      };
    case STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_OPEN_MODAL:
      return {
        ...state,
        studentPaymentOpenModal: action.payload,
      };
    case STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_MODAL_LOADING:
      return {
        ...state,
        studentPaymentModalLoading: action.payload,
      };
    default:
      return state;
  }
};
