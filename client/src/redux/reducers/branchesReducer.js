import { BRANCHES_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  branchesData: [],
  loading: false,
};

export const branchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANCHES_ALL_ACTIONS_TYPE.GET_BRANCHES:
      return {
        ...state,
        branchesData: action.payload,
        // loading: false,
      };
    case BRANCHES_ALL_ACTIONS_TYPE.BRANCHES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case BRANCHES_ALL_ACTIONS_TYPE.CREATE_BRANCHES:
      return {
        ...state,
        branchesData: [...state.branchesData, action.payload],
      };
    case BRANCHES_ALL_ACTIONS_TYPE.UPDATE_BRANCHES:
      return {
        ...state,
        branchesData: state.branchesData.map((branch) =>
          branch._id === action.payload._id ? action.payload : branch
        ),
      };
    case BRANCHES_ALL_ACTIONS_TYPE.DELETE_BRANCHES:
      return {
        ...state,
        branchesData: state.branchesData.filter(
          (branch) => branch._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
