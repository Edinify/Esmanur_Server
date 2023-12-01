import { TEACHERS_CATEGORY_ACTION_TYPE } from "../actions-type";

const initialState = {
  category: "",
};

export const teachersCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHERS_CATEGORY_ACTION_TYPE.GET_TEACHERS_CATEGORY:
      return {
        category: action.payload,
      };
    default:
      return state;
  }
};
