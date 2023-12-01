import { SEARCH_VALUES_ACTION_TYPES } from "../actions-type";

const initialState = {
  teachersSearchValues: "",
  adminsSearchValues: "",
  studentSearchValues: "",
  coursesSearchValues: "",
  salariesSearchValues: "",
  bonusSearchValues: "",
  fineSearchValues: "",
};

export const searchValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VALUES_ACTION_TYPES.TEACHERS_SEARCH_VALUE:
      return {
        ...state,
        teachersSearchValues: action.payload,
        // ...action.payload
      };
    case SEARCH_VALUES_ACTION_TYPES.STUDENTS_SEARCH_VALUE:
      return {
        ...state,
        studentSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.COURSES_SEARCH_VALUE:
      return {
        ...state,
        coursesSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.SALARIES_SEARCH_VALUE:
      return {
        ...state,
        salariesSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE:
      // console.log(action.payload, "bonus sarch value reducer");
      return {
        ...state,
        bonusSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.FINE_SEARCH_VALUE:
      return {
        ...state,
        fineSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.ADMINS_SEARCH_VALUE:
      return {
        ...state,
        adminsSearchValues: action.payload,
      };
    default:
      return state;
  }
};
