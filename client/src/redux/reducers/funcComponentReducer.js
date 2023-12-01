import { FUNC_COMPONENT_ACTION_TYPE } from "../actions-type";

const initialState={
    funcComp:false
}

export const funcComponentReducer=(state=initialState,action)=>{
    switch(action.type){
        case FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP:
            return{
                ...state,
                funcComp:action.payload
                
            }
            default :
            return state;
    }
}