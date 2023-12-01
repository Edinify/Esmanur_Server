import axios from "axios";
import {
  INCOMES_MODAL_ACTION_TYPE,
  INCOME_ACTION_TYPE,
} from "../actions-type/";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/income`,
  withCredentials:true
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
});

// const REGISTERAPI = axios.create({
//   // "https://deployement.azurewebsites.net/api/user/auth"
//   baseURL: "https://deployement.azurewebsites.net/user/auth",
// });

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

export const setLoadingIncomesAction = (loadingValue) => ({
  type: INCOME_ACTION_TYPE.INCOME_LOADING,
  payload: loadingValue,
});

const incomesModalLoading = (loadingValue) => ({
  type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_LOADING,
  payload: loadingValue,
});

export const getIncomePaginationAction =
  (page = 1, startDate, endDate, monthCount) =>
  async (dispatch) => {
    dispatch(setLoadingIncomesAction(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`);

      // console.log(data,"get")

      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_PAGINATION,
        payload: data,
      });
      dispatch(setLoadingIncomesAction(false));
    } catch (error) {
      console.log(error);
      const originalRequest = error.config;
      dispatch(setLoadingIncomesAction(false));
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
            }&monthCount=${monthCount || ""}`);

          dispatch({
            type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: INCOME_ACTION_TYPE.GET_INCOME_PAGINATION,
            payload: data,
          });
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } 
    // finally {
    //   dispatch(setLoadingIncomesAction(false));
    // }
  };

export const createIncomesAction = (incomesData) => async (dispatch) => {
  // console.log(incomesData);
  dispatch(incomesModalLoading(true));
  try {
    const { data } = await API.post("/", incomesData);
    dispatch(getIncomePaginationAction(data.lastPage, "", "", 1));
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
      payload: false,
    });
    // console.log(data,"create")

    toastSuccess("Yeni məhsul əlavə edildi");
    // dispatch({type:INCOME_ACTION_TYPE.CREATE_INCOME,payload:data})
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

        const { data } = await API.post("/", incomesData);
        dispatch(
          getIncomePaginationAction(data.lastPage, "", "", 1)
        );
        dispatch({
          type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
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
    if (error?.response?.status === 403){
      dispatch(logoutAction())
    }
  } finally {
    dispatch(incomesModalLoading(false));
  }
};
export const updateIncomesAction = (_id, incomesData) => async (dispatch) => {
  // console.log(incomesData);
  dispatch(incomesModalLoading(true));

  try {
    const { data } = await API.patch(`/${_id}`, incomesData);
    // console.log(data);
    dispatch({ type: INCOME_ACTION_TYPE.UPDATE_INCOME, payload: data });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Məhsul yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, incomesData);
        dispatch({ type: INCOME_ACTION_TYPE.UPDATE_INCOME, payload: data });
        dispatch({
          type: INCOMES_MODAL_ACTION_TYPE.INCOMES_OPEN_MODAL,
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
    dispatch(incomesModalLoading(false));
  }
};

export const deleteIncomesAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: INCOME_ACTION_TYPE.DELETE_INCOME, payload: _id });
    dispatch(getIncomePaginationAction(1, "", "", 1));
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
        dispatch({ type: INCOME_ACTION_TYPE.DELETE_INCOME, payload: _id });
        dispatch(getIncomePaginationAction(1, "", "", 1));
        toastSuccess("Məhsul silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403){
      dispatch(logoutAction())
    }
  }
};
