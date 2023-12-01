import { FINE_PAGINATION_ACTION_TYPE } from "../actions-type";

const initialState = {
  fineData: [],
  loading: false,
  totalPages: 1,
  lastPage: "",
  // openFineModal: false,
};

export const finePaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINE_PAGINATION_ACTION_TYPE.GET_FINE:
      return {
        ...state,
        fineData: action.payload,
      };
    case FINE_PAGINATION_ACTION_TYPE.GET_FINE_PAGINATION:
      return {
        ...state,
        fineData: action.payload.fines,
        totalPages: action.payload.totalPages,
      };
    case FINE_PAGINATION_ACTION_TYPE.CREATE_FINE:
      return {
        ...state,
        fineData: [...state.fineData, action.payload],
      };
    case FINE_PAGINATION_ACTION_TYPE.UPDATE_FINE:
      return {
        ...state,
        fineData: state.fineData.map((fine) =>
          fine._id === action.payload._id ? action.payload : fine
        ),
      };
    case FINE_PAGINATION_ACTION_TYPE.DELETE_FINE:
      return {
        ...state,
        fineData: state.fineData.filter(
          (fine) => fine._id !== action.payload._id
        ),
      };
    case FINE_PAGINATION_ACTION_TYPE.GET_FINE_LAST_PAGE:
      return {
        ...state,
        loading: false,
        lastPage: action.payload,
      };
    case FINE_PAGINATION_ACTION_TYPE.FINE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
