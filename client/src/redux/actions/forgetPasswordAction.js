import axios from "axios";
import { FORGET_PASSWORD_ACTIONS_TYPE } from "../actions-type";
import { toast } from "react-toastify";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user`,
  withCredentials:true
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    toastClassName: "custom-toast",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const goToForgetPageAction = () => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_ACTIONS_TYPE.GO_TO_FORGET_PAGE });
};

export const sendToEmailAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
      payload: true,
    });
    const { data } = await API.post("/auth/login/forget/send_to_email", {
      email,
    });
    // console.log(email)
    dispatch({ type: FORGET_PASSWORD_ACTIONS_TYPE.SEND_EMAIL, payload: data });
    localStorage.setItem("userEmail", JSON.stringify(email));
  } catch (error) {
    if (error?.response?.status === 404) {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_ERROR,
        payload: "Daxil etdiyiniz email düzgün deyil",
      });
    }
    console.log(error);
    toastError(error.response.data.message);
  } finally {
    dispatch({
      type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
      payload: false,
    });
  }
};

export const resendToEmailAction = (email) => async (dispatch) => {
  try {
    await API.post("/auth/login/forget/send_to_email", { email });
  } catch (error) {
    if (error?.response?.status === 404) {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_ERROR,
        payload: "Daxil etdiyiniz email düzgün deyil",
      });
    }
    console.log(error);
    toastError(error.response.data.message);
  }
};

export const checkOTPAction = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
      payload: true,
    });
    const { data } = await API.post("/auth/login/forget/check_otp", { otp });
    dispatch({ type: FORGET_PASSWORD_ACTIONS_TYPE.CHECKOTP, payload: data });
  } catch (error) {
    if(error.response.data.message==="invalid-otp"){
    toastError("Daxil etdiyiniz otp yalnışdır")
    }
    dispatch({
      type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
      payload: false,
    });
    console.log(error);
    if (error?.response?.status === 404) {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_ERROR,
        payload: "Daxil etdiyiniz kod düzgün deyil",
      });
    }
  } finally {
    dispatch({
      type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
      payload: false,
    });
  }
};

export const changePasswordAction =
  (newPassword, userId) => async (dispatch) => {
    try {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
        payload: true,
      });

      const { data } = await API.patch(`/auth/login/forget/change_password`, {
        newPassword,
        userId,
      });
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.UPDATE_PASSWORD,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
        payload: false,
      });
    } finally {
      dispatch({
        type: FORGET_PASSWORD_ACTIONS_TYPE.FORGET_LOADING,
        payload: false,
      });
    }
  };
