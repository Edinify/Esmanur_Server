import { SIDEBAR_ACTION_TYPE } from "../actions-type";

const initialState={
    openSidebar:false
}

export const sidebarOpenReducer=(state=initialState,action)=>{
switch(action.type){
    case SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL:
        return{
            ...state,
            openSidebar:action.payload
        }
        default:
            return state;
}
}