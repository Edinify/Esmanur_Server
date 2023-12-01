import axios from "axios";
import { AUTH_ALL_ACTION_TYPE } from "../actions-type";
import { toast } from "react-toastify";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user`,
    withCredentials: true,
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

export const loginAction = (authData) => async (dispatch) => {
  dispatch(setLoadingAction(true));


  // console.log(authData)

  try {
    const { data } = await API.post("/auth/login", authData);
    // console.log(data);
    dispatch({ type: AUTH_ALL_ACTION_TYPE.LOGIN, payload: { data: data } });
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 404) {
      toastError("Email və ya şifrə yalnışdır");
    }
  } finally {
    dispatch(setLoadingAction(false));
  }
};
export const logoutAction = () => async () => {
  // dispatch({ type: AUTH_ALL_ACTION_TYPE.LOGOUT });
  localStorage.clear();
  window.location = "/login";
};

export const setLoadingAction = (loadingValue) => ({
  type: AUTH_ALL_ACTION_TYPE.AUTH_LOADING,
  payload: loadingValue,
});
