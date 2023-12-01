import {  FORGET_PASSWORD_ACTIONS_TYPE } from "../actions-type";

const initialState = {
    email:false,
    otp:false,
    changePassword:false,
    userId:null,
    login:true,
    loading:false,
    error:""

  };
  
  const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGET_PASSWORD_ACTIONS_TYPE.GO_TO_FORGET_PAGE:
        return{
          ...state,
          login:false,
          email:true,
          error:""

        }
      case FORGET_PASSWORD_ACTIONS_TYPE.SEND_EMAIL:
        return {
          ...state,
          email:false,
          otp:true,
          error:""

        };
      case FORGET_PASSWORD_ACTIONS_TYPE.CHECKOTP:
        return {
          ...state,
          otp:false,
          changePassword:true,
          userId:action.payload.userId,
          error:""


        };
      case FORGET_PASSWORD_ACTIONS_TYPE.UPDATE_PASSWORD:
        return {
          ...state,
          changePassword:false,
          userId:null,
          login:true,
          error:""

         
        };

        case FORGET_PASSWORD_ACTIONS_TYPE.FORGET_ERROR:
          return{
            ...state,
            error:action.payload

          }
          case FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING:
            return{
              ...state,
              loading:action.payload
            }

     
      default:
        return state;
    }
  };
  
  export default forgotPasswordReducer;
  