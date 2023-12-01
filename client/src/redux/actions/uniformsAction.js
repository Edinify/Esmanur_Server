import axios from "axios";
import {
  UNIFORMS_ACTION_TYPE,
  UNIFORMS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/uniform`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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

export const setLoadingUniformsAction = (loadingValue) => ({
  type: UNIFORMS_ACTION_TYPE.UNIFORMS_LOADING,
  payload: loadingValue,
});

const uniformsModalLoading = (loadingValue) => ({
  type: UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_MODAL_LOADING,
  payload: loadingValue,
});

export const getUniformsPaginationAction =
  (page = 1, startDate, endDate, monthCount) =>
  async (dispatch) => {
    dispatch(setLoadingUniformsAction(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data,"get")
      dispatch({
        type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_PAGINATION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.get(
            `/?page=${page}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );

          dispatch({
            type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: UNIFORMS_ACTION_TYPE.GET_UNIFORMS_PAGINATION,
            payload: data,
          });
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(setLoadingUniformsAction(false));
    }
  };

export const createUniformAction = (uniformData) => async (dispatch) => {
  // console.log(uniformData);
  dispatch(uniformsModalLoading(true));
  try {
    const { data } = await API.post("/", uniformData);
    dispatch(getUniformsPaginationAction(data.lastPage, "", "", 1));
    // console.log(data);
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni məhsul əlavə edildi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.post("/", uniformData);
        dispatch(getUniformsPaginationAction(data.lastPage, "", "", 1));
        dispatch({
          type: UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni məhsul əlavə edildi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(uniformsModalLoading(false));
  }
};

export const updateUniformAction =
  (_id, uniformData) => async (dispatch) => {
    dispatch(uniformsModalLoading(true));
    try {
      const { data } = await API.patch(`/${_id}`, uniformData);
      dispatch({
        type: UNIFORMS_ACTION_TYPE.UPDATE_UNIFORMS,
        payload: data,
      });
      dispatch({
        type: UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_OPEN_MODAL,
        payload: false,
      });
      toastSuccess("Məhsul yeniləndi");
    } catch (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.patch(`/${_id}`, uniformData);
          dispatch({
            type: UNIFORMS_ACTION_TYPE.UPDATE_UNIFORMS,
            payload: data,
          });
          dispatch({
            type: UNIFORMS_MODAL_ACTION_TYPE.UNIFORMS_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Məhsul yeniləndi");
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(uniformsModalLoading(false));
    }
  };

export const deleteUniformAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({
      type: UNIFORMS_ACTION_TYPE.DELETE_UNIFORMS,
      payload: _id,
    });
    dispatch(getUniformsPaginationAction(1, "", "", 1));

    toastSuccess("Məhsul silindi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
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
        dispatch({
          type: UNIFORMS_ACTION_TYPE.DELETE_UNIFORMS,
          payload: _id,
        });
        dispatch(getUniformsPaginationAction(1, "", "", 1));

        toastSuccess("Məhsul silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
