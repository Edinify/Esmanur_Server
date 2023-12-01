import axios from "axios";
import { CHANGE_PASSPWORD_ACTION_TYPE } from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
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

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
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

export const changeAdminPasswordAction = (
  oldPassword,
  newPassword,
) => {
  return async (dispatch) => {
    try {
      const response = await API.patch(`admin/me/password`, {
        newPassword,
        oldPassword,
      });

      dispatch(logoutAction());
    } catch (error) {
      dispatch({
        type: CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,
        payload: false,
      });

      if (error?.response?.data?.key === "old-password-incorrect.") {
        toastError("köhnə şifrə yalnışdır");
        return;
      }
      console.log(error);
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const response = await API.patch(`admin/me/password`, {
            newPassword,
            oldPassword,
          });
    
          dispatch(logoutAction());
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    }
  };
};
export const changeTeacherPasswordAction = (oldPassword, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await API.patch(`teacher/me/password`, {
        newPassword,
        oldPassword,
      });

      dispatch(logoutAction());
    } catch (error) {
      dispatch({
        type: CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,
        payload: false,
      });

      if (error?.response?.data?.key === "old-password-incorrect.") {
        toastError("köhnə şifrə yalnışdır");
        return;
      }
      console.log(error);
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const response = await API.patch(`teacher/me/password`, {
            newPassword,
            oldPassword,
          });
    
          dispatch(logoutAction());
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    }
  };
};

export const changeStudentPasswordAction = (
  oldPassword,
  newPassword,
) => {
  return async (dispatch) => {
    try {
      const response = await API.patch(`student/me/password`, {
        newPassword,
        oldPassword,
      });

      dispatch(logoutAction());
    } catch (error) {
      dispatch({
        type: CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,
        payload: false,
      });

      if (error?.response?.data?.key === "old-password-incorrect.") {
        toastError("köhnə şifrə yalnışdır");
        return;
      }
      console.log(error);
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const response = await API.patch(`student/me/password`, {
            newPassword,
            oldPassword,
          });
    
          dispatch(logoutAction());
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    }
  };
};
