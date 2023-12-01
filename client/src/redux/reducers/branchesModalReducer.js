import { BRANCHES_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  branchesModalData: { name: "" },
  branchesOpenModal: false,
  branchesModalLoading: false,
};

export const branchesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANCHES_MODAL_ACTION_TYPE.GET_BRANCH_MODAL:
      return {
        ...state,
        branchesModalData: action.payload.data,
        branchesOpenModal: action.payload.openModal,
      };
    case BRANCHES_MODAL_ACTION_TYPE.BRANCH_OPEN_MODAL:
      return {
        ...state,
        branchesOpenModal: action.payload,
      };
    case BRANCHES_MODAL_ACTION_TYPE.BRANCH_MODAL_LOADING:
      return {
        ...state,
        branchesModalLoading: action.payload,
      };
    default:
      return state;
  }
};
