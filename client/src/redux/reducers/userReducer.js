import { USER_ACTION_TYPE } from "../actions-type/index";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ACTION_TYPE.ADD_USER:
      return {
        user: action.payload,
      };
    case USER_ACTION_TYPE.UPDATE_IMAGE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
