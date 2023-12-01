import { COURSES_ALL_ACTIONS_TYPE } from "../actions-type";


const initialState={
    courses:[],
    totalPages:1,
    lastPage: '',
    loading:false
}

export const coursesPaginationReducer=(state=initialState,action)=>{
    switch(action.type){
      case COURSES_ALL_ACTIONS_TYPE.GET_COURSE:
        return {
          ...state,
          courses: action.payload,
          // loading:action.payload.loading
        };
  
        case COURSES_ALL_ACTIONS_TYPE.COURSE_LOADING:
          return{
            ...state,
            loading:action.payload
          }
        case COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION:
          return{
              ...state,
              ...action.payload
          }
        case COURSES_ALL_ACTIONS_TYPE.CREATE_COURSE:
          return {
              ...state,
            courses: [...state.courses, action.payload],
          };
        case COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE:
          return {
              ...state,
              courses: state.courses.map((course) =>
              course._id === action.payload._id ? action.payload : course
            ),
          };
        case COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE:
          return {
              ...state,
            courses: state.courses.filter(
              (course) => course._id !== action.payload
            ),
          };
        case COURSES_ALL_ACTIONS_TYPE.GET_COURSES_LAST_PAGE:
          return{
            // ...state,
            lastPage: action.payload,
          };
        default:
            return state;
    }
}