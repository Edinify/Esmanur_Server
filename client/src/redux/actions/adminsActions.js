import axios from "axios";
import {
  ADMIN_ALL_ACTIONS_TYPE,
  ADMINS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user/admin`,
    withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
    withCredentials: true,
});

const REGISTERAPI = axios.create({
  baseURL: `${apiRoot}/user/auth`,
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

REGISTERAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

export const setLoadingAdminAction = (loadingValue) => ({
  type: ADMIN_ALL_ACTIONS_TYPE.ADMIN_LOADING,
  payload: loadingValue,
});

export const adminModalLoading = (loadingValue) => ({
  type: ADMINS_MODAL_ACTION_TYPE.ADMIN_MODAL_LOADING,
  payload: loadingValue,
});

const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
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

export const getAdminsAction = () => async (dispatch) => {
  dispatch(setLoadingAdminAction(true));
  try {
    const { data } = await API.get("/");
    dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.GET_ADMIN, payload: data });
  } catch (error) {
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

        const { data } = await API.get("/");
        dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.GET_ADMIN, payload: data });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  } finally {
    dispatch(setLoadingAdminAction(false));
  }
};
export const createAdminAction = (adminData) => async (dispatch) => {
  // console.log(adminData);
  dispatch(adminModalLoading(true));
  try {
    const { data } = await REGISTERAPI.post("/admin/sign", adminData);
    dispatch(getAdminsAction());
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.ADMIN_OPEN_MODAL,
      payload: false,
    });
    // dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.CREATE_ADMIN, payload: data });
    toastSuccess("Yeni admin yaradıldı");
  } catch (error) {
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
        const { data } = await REGISTERAPI.post("/admin/sign", adminData);
        dispatch(getAdminsAction());
        dispatch({
          type: ADMINS_MODAL_ACTION_TYPE.ADMIN_OPEN_MODAL,
          payload: false,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    console.log(error);
  } finally {
    dispatch(adminModalLoading(false));
  }
};

export const updateAdminAction = (_id, adminData) => async (dispatch) => {
  // console.log(adminData);
  dispatch(adminModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, adminData);
    dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.UPDATE_ADMIN, payload: data });
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.ADMIN_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Admin yeniləndi");
  } catch (error) {
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
        const { data } = await API.patch(`/${_id}`, adminData);
        dispatch({
          type: ADMIN_ALL_ACTIONS_TYPE.UPDATE_ADMIN,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      dispatch({
        type: ADMINS_MODAL_ACTION_TYPE.ADMIN_OPEN_MODAL,
        payload: true,
      });
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    console.log(error);
  } finally {
    dispatch(adminModalLoading(false));
  }
};

export const deleteAdminAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);

    dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.DELETE_ADMIN, payload: _id });
    toastSuccess("Admin silindi");
  } catch (error) {
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

        await API.delete(`/${_id}`);

        dispatch({ type: ADMIN_ALL_ACTIONS_TYPE.DELETE_ADMIN, payload: _id });
        toastSuccess("Admin silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    console.log(error);
    toastError(error?.response?.data.message);
  }
};
