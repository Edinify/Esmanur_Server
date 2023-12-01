import { TEACHER_BONUS_ACTION_TYPE } from "../actions-type";

const initialState={
    teacherBonus:[],
    teacherFine:[],
}

export const teacherBonusReducer=(state=initialState,action)=>{
    switch(action.type){
        case TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_BONUS:
            return{
                ...state,
                teacherBonus:action.payload
            }
            case TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_FINE:
                return{
                    ...state,
                    teacherFine:action.payload
                }

            default:
                return state;
    }
}