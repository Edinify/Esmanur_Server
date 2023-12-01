import { PAGINATION_PAGE_NUMBER_ACTION_TYPE } from "../actions-type";



export const paginationPageNumberReducer=(state={pageNumber:0},action)=>{
    switch(action.type){
        case PAGINATION_PAGE_NUMBER_ACTION_TYPE.GET_PAGE_NUMBER:
            return{
                pageNumber:action.payload
            }

            case PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER:
                return{
                    ...state,
                    pageNumber:action.payload
                }
            default:
                return state;
    }
}