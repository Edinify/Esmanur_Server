import { STUDENT_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  studentStatus: "",
};

export const studentStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS:
      return {
        ...state,
        studentStatus: action.payload,
      };
    default:
      return state;
  }
};
