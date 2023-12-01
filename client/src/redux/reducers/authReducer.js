import { AUTH_ALL_ACTION_TYPE } from "../actions-type";

const initialState = {
  auth: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ALL_ACTION_TYPE.LOGIN:
      // console.log(action.payload.data);
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      return {
        ...state,
        auth: action.payload.data,
        loading: action.payload,
        error: false,
      };
    case AUTH_ALL_ACTION_TYPE.LOGOUT:
      localStorage.clear();
      return {
        auth: null,
        loading: false,
        error: false,
      };
    case AUTH_ALL_ACTION_TYPE.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
