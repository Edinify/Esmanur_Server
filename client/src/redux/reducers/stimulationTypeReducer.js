import { STIMULATION_PAGE_TYPE_ACTION_TYPE } from "../actions-type";


export const stimulationTypeReducer=(state={stimulationType:"bonus"},action)=>{
    switch(action.type){
        case STIMULATION_PAGE_TYPE_ACTION_TYPE.GET_STIMULATION_PAGE_TYPE:
            return{
                ...state,
                stimulationType:action.payload
            }
            default:
                return state;
    }
}