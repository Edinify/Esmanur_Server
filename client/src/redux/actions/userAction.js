import axios from "axios";
import { ADMINS_MODAL_ACTION_TYPE, USER_ACTION_TYPE } from "../actions-type";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";
import { adminModalLoading, getAdminsAction } from "./adminsActions";
import { toast } from "react-toastify";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const REGISTERAPI = axios.create({
  baseURL: `${apiRoot}/user/auth`,
  withCredentials: true,
});

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

REGISTERAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
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

export const userAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/admin/current");
    dispatch({ type: USER_ACTION_TYPE.ADD_USER, payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
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

        const { data } = await API.get("/auth");
        dispatch({ type: USER_ACTION_TYPE.ADD_USER, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const userUpdateAction = (_id, branchData) => async (dispatch) => {
  // console.log(branchData);
  try {
    const { data } = await API.patch(`/admin/super/${_id}`, branchData);
    dispatch({ type: USER_ACTION_TYPE.ADD_USER, payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
    // console.log(data);
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

        const { data } = await API.get("/auth");
        dispatch({ type: USER_ACTION_TYPE.ADD_USER, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const createAdminAction = (adminData) => async (dispatch) => {
  // console.log(adminData);
  dispatch(adminModalLoading(true));
  try {
    const { data } = await REGISTERAPI.post("/sign/admin", adminData);
    // console.log(data);
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
        const { data } = await REGISTERAPI.post("/sign/admin", adminData);
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
