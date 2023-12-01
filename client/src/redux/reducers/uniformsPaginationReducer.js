import { UNIFORMS_ACTION_TYPE } from "../actions-type/index";

const initialState = {
  uniformsData: [],
  loading: false,
  totalPages: 1,
  lastPage: 1,
};

export const uniformsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNIFORMS_ACTION_TYPE.GET_UNIFORMS:
      return {
        ...state,
        uniformsData: action.payload.uniforms,
        totalPages: action.payload.totalPages,
        // loading: false,
      };

    case UNIFORMS_ACTION_TYPE.GET_UNIFORMS_PAGINATION:
      return {
        ...state,
        uniformsData: action.payload.uniforms,
        totalPages:action.payload.totalPages,
      };
    case UNIFORMS_ACTION_TYPE.UNIFORMS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case UNIFORMS_ACTION_TYPE.CREATE_UNIFORMS:
      return {
        ...state,
        uniformsData: [...state?.uniformsData, action.payload],
      };
    case UNIFORMS_ACTION_TYPE.UPDATE_UNIFORMS:
      return {
        ...state,
        uniformsData: state?.uniformsData?.map((uniform) =>
          uniform._id === action.payload._id ? action.payload : uniform
        ),
      };

    case UNIFORMS_ACTION_TYPE.DELETE_UNIFORMS:
      return {
        ...state,
        uniformsData: state?.uniformsData?.filter(
          (uniform) => uniform._id !== action.payload
        ),
      };
    case UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE:
      return {
        ...state,
        loading:false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
