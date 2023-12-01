import { ALL_COURSES_ACTION } from "../actions-type"
const initialState={
    allCourses:[]
}

export const allCoursesReducer = (state=initialState,action)=>{
    switch(action.type){
        case ALL_COURSES_ACTION.GET_ALL_COURSE:
            return{
                ...state,
                allCourses:action.payload
            }
            default:
                return state;
    }
}