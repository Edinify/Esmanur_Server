import { DROPDOWN_ERROR_TYPE } from "../actions-type";

export const dropdownNameErrReducer = (state = {dropdownNameError: false}, action) => {
    switch(action.type) {
        case DROPDOWN_ERROR_TYPE.GET_DROPDOWN_ERROR:
            return {
                dropdownNameError: action.payload
            }
        default:
            return state
    }
}