import { CHANGE_PASSPWORD_ACTION_TYPE } from "../actions-type"
const initialState={
        loading:false
}

export const changePasswordReducer=(state=initialState,action)=>{
    switch (action.type){
        case CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING:
            return{
                ...state,
                loading:action.payload
            }
            default:
                return state;
    }
}