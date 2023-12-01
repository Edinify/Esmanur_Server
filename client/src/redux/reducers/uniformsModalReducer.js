import { UNIFORMS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  uniformModalData: { category: "", appointment: "", amount: "", date: "" },
  uniformOpenModal: false,
  uniformModalLoading: false,
};

export const uniformsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL:
      return {
        ...state,
        uniformModalData: action.payload.data,
        uniformOpenModal: action.payload.openModal,
      };
    case UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_OPEN_MODAL:
      return {
        ...state,
        uniformOpenModal: action.payload,
      };
    case UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_MODAL_LOADING:
      return {
        ...state,
        uniformModalLoading: action.payload,
      };
    default:
      return state;
  }
};
