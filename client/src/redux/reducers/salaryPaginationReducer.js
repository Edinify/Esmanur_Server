import { SALARY_ACTION_TYPE } from "../actions-type";

const initialState = {
  salariesData: [],
  teacherSalaryData: [],
  totalPage: 1,
  loading:false,
};

export const salaryPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALARY_ACTION_TYPE.GET_SALARY_PAGINATION:
      return {
        ...state,
        salariesData: action.payload.salaries,
        totalPage: action.payload.totalPages,
      };
    case SALARY_ACTION_TYPE.SALARY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SALARY_ACTION_TYPE.GET_TEACHER_SALARY_PAGINATION:
      return {
        ...state,
        teacherSalaryData: action.payload.salary,
      };

    default:
      return state;
  }
};
