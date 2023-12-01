import axios from "axios";
import { FINANCE_ACTIONS_TYPE } from "../actions-type";
import { apiRoot } from "../../apiRoot";
import { logoutAction } from "./auth";

const API = axios.create({
  baseURL: `${apiRoot}/finance`,
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

export const getFinanceChartAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/chart/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount}`
      );
      // console.log(data)
      dispatch({
        type: FINANCE_ACTIONS_TYPE.GET_FINANCE_CHART,
        payload: data,
      });
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

          const { data } = await API.get(
            `/chart/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount}`
          );
          // console.log(data)
          dispatch({
            type: FINANCE_ACTIONS_TYPE.GET_FINANCE_CHART,
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
  };

export const getFinanceDataAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount}`
      );
      // console.log(data)
      dispatch({
        type: FINANCE_ACTIONS_TYPE.GET_FINANCE_DATA,
        payload: data,
      });
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

          const { data } = await API.get(
            `/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount}`
          );
          // console.log(data)
          dispatch({
            type: FINANCE_ACTIONS_TYPE.GET_FINANCE_DATA,
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
  };
