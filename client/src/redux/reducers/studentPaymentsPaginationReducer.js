import { STUDENT_PAYMENTS_ACTION_TYPE } from "../actions-type/index";

const initialState = {
  studentPaymentsData: [],
  loading: false,
  totalPages: 1,
  lastPage: 1,
};

export const studentPaymentsPaginationReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS:
      return {
        ...state,
        studentPaymentsData: action.payload.STUDENT_PAYMENTS,
        totalPages: action.payload.totalPages,
      };

    case STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_PAGINATION:
      return {
        ...state,
        studentPaymentsData: action.payload.studentPayments,
        totalPages: action.payload.totalPages,
      };
    case STUDENT_PAYMENTS_ACTION_TYPE.STUDENT_PAYMENTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case STUDENT_PAYMENTS_ACTION_TYPE.CREATE_STUDENT_PAYMENTS:
      return {
        ...state,
        studentPaymentsData: [...state?.studentPaymentsData, action.payload],
      };
    case STUDENT_PAYMENTS_ACTION_TYPE.UPDATE_STUDENT_PAYMENTS:
      return {
        ...state,
        studentPaymentsData: state?.studentPaymentsData?.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };

    case STUDENT_PAYMENTS_ACTION_TYPE.DELETE_STUDENT_PAYMENTS:
      return {
        ...state,
        studentPaymentsData: state?.studentPaymentsData?.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_LAST_PAGE:
      return {
        ...state,
        loading: false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
