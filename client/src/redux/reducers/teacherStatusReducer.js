import { TEACHER_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  teacherStatus: "",
};

export const teacherStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER_STATUS_FILTER_ACTION_TYPE.GET_TEACHER_STATUS:
      return {
        ...state,
        teacherStatus: action.payload,
      };
    default:
      return state;
  }
};
