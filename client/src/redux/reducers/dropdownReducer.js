import { DROPDOWN_NAME_ACTION_TYPE } from "../actions-type";



export  const dropdownReducer = (state = { dropdownName: '' }, action) => {
    switch (action.type) {
      case DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN:
        return {
          ...state,
          dropdownName: action.payload,
        };
      default:
        return state; 
    }
  };
  