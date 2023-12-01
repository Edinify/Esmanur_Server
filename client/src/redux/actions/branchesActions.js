import axios from "axios";
import {
  BRANCHES_MODAL_ACTION_TYPE,
  BRANCHES_ALL_ACTIONS_TYPE,
} from "../actions-type/";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/branch`,
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

export const setLoadingBranchesAction = (loadingValue) => ({
  type: BRANCHES_ALL_ACTIONS_TYPE.BRANCHES_LOADING,
  payload: loadingValue,
});

const branchModalLoading = (loadingValue) => ({
  type: BRANCHES_MODAL_ACTION_TYPE.BRANCH_MODAL_LOADING,
  payload: loadingValue,
});

export const getBranchesAction = () => async (dispatch) => {
  dispatch(setLoadingBranchesAction(true));
  // console.log('get');
  try {
    const { data } = await API.get("/");
    // console.log(data);
    dispatch({
      type: BRANCHES_ALL_ACTIONS_TYPE.GET_BRANCHES,
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

        const { data } = await API.get(`/`);
        dispatch({
          type: BRANCHES_ALL_ACTIONS_TYPE.GET_BRANCHES,
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
    dispatch(setLoadingBranchesAction(false));
  }
};

export const createBranchAction = (branchesData) => async (dispatch) => {
  console.log(branchesData);
  dispatch(branchModalLoading(true));
  try {
    const { data } = await API.post("/", branchesData);
    dispatch(getBranchesAction());
    dispatch({
      type: BRANCHES_MODAL_ACTION_TYPE.BRANCH_OPEN_MODAL,
      payload: false,
    });

    toastSuccess("Yeni Filial əlavə edildi");
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

        const { data } = await API.post("/", branchesData);
        dispatch(getBranchesAction());
        dispatch({
          type: BRANCHES_MODAL_ACTION_TYPE.BRANCH_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni Filial əlavə edildi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403) {
      dispatch(logoutAction());
    }
  } finally {
    dispatch(branchModalLoading(false));
  }
};
export const updateBranchAction = (_id, branchesData) => async (dispatch) => {
  dispatch(branchModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, branchesData);
    dispatch({
      type: BRANCHES_ALL_ACTIONS_TYPE.UPDATE_BRANCHES,
      payload: data,
    });
    dispatch({
      type: BRANCHES_MODAL_ACTION_TYPE.BRANCH_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Filial yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, branchesData);
        dispatch({
          type: BRANCHES_ALL_ACTIONS_TYPE.UPDATE_BRANCHES,
          payload: data,
        });
        dispatch({
          type: BRANCHES_MODAL_ACTION_TYPE.BRANCH_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Filial yeniləndi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(branchModalLoading(false));
  }
};

export const deleteBranchAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: BRANCHES_ALL_ACTIONS_TYPE.DELETE_BRANCHES, payload: _id });
    dispatch(getBranchesAction());
    toastSuccess("Filial silindi");
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
          type: BRANCHES_ALL_ACTIONS_TYPE.DELETE_BRANCHES,
          payload: _id,
        });
        dispatch(getBranchesAction());
        toastSuccess("Filial silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403) {
      dispatch(logoutAction());
    }
  }
};
