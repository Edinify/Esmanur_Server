import axios from "axios";
import {
  FOOD_RATION_ACTION_TYPE,
  FOOD_RATION_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/food`,
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

export const setLoadingFoodRationAction = (loadingValue) => ({
  type: FOOD_RATION_ACTION_TYPE.FOOD_RATION_LOADING,
  payload: loadingValue,
});

const foodRationModalLoading = (loadingValue) => ({
  type: FOOD_RATION_MODAL_ACTION_TYPE.FOOD_RATION_MODAL_LOADING,
  payload: loadingValue,
});

export const getFoodRationPaginationAction =
  (page = 1, startDate, endDate, monthCount) =>
  async (dispatch) => {
    dispatch(setLoadingFoodRationAction(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data,"get")
      dispatch({
        type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_PAGINATION,
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
            type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: FOOD_RATION_ACTION_TYPE.GET_FOOD_RATION_PAGINATION,
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
      dispatch(setLoadingFoodRationAction(false));
    }
  };

export const createFoodRationAction = (foodRationData) => async (dispatch) => {
  console.log(foodRationData);
  dispatch(foodRationModalLoading(true));
  try {
    const { data } = await API.post("/", foodRationData);
    dispatch(getFoodRationPaginationAction(data.lastPage, "", "", 1));
    console.log(data);
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.FOOD_RATION_OPEN_MODAL,
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

        const { data } = await API.post("/", foodRationData);
        dispatch(getFoodRationPaginationAction(data.lastPage, "", "", 1));
        dispatch({
          type: FOOD_RATION_MODAL_ACTION_TYPE.FOOD_RATION_OPEN_MODAL,
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
    dispatch(foodRationModalLoading(false));
  }
};

export const updateFoodRationAction =
  (_id, foodRationData) => async (dispatch) => {
    dispatch(foodRationModalLoading(true));
    try {
      const { data } = await API.patch(`/${_id}`, foodRationData);
      dispatch({
        type: FOOD_RATION_ACTION_TYPE.UPDATE_FOOD_RATION,
        payload: data,
      });
      dispatch({
        type: FOOD_RATION_MODAL_ACTION_TYPE.FOOD_RATION_OPEN_MODAL,
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
          const { data } = await API.patch(`/${_id}`, foodRationData);
          dispatch({
            type: FOOD_RATION_ACTION_TYPE.UPDATE_FOOD_RATION,
            payload: data,
          });
          dispatch({
            type: FOOD_RATION_MODAL_ACTION_TYPE.FOOD_RATION_OPEN_MODAL,
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
      dispatch(foodRationModalLoading(false));
    }
  };

export const deleteFoodRationAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({
      type: FOOD_RATION_ACTION_TYPE.DELETE_FOOD_RATION,
      payload: _id,
    });
    dispatch(getFoodRationPaginationAction(1, "", "", 1));

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
          type: FOOD_RATION_ACTION_TYPE.DELETE_FOOD_RATION,
          payload: _id,
        });
        dispatch(getFoodRationPaginationAction(1, "", "", 1));

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
