import { ADMINS_MODAL_ACTION_TYPE } from "../actions-type"

const initialState = {
    adminsModalData: {
        fullName: "",
        email: "",
        password: "",
    },
    adminsOpenModal: false,
    adminsModalLoading: false,
}

export const adminsModalReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL:
            return {
                ...state,
                adminsModalData: action.payload.data,
                adminsOpenModal: action.payload.openModal
            }
            case ADMINS_MODAL_ACTION_TYPE.ADMIN_OPEN_MODAL:
                return{
                    ...state,
                    adminsOpenModal:action.payload
                }
                case ADMINS_MODAL_ACTION_TYPE.ADMIN_MODAL_LOADING:
                    return {
                      ...state,
                      adminsModalLoading: action.payload,
                    };
        default:
            return state
    }
}