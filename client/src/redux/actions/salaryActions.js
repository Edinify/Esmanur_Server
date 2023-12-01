import axios from "axios";
import { SALARY_ACTION_TYPE } from "../actions-type";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";
// import { toast } from "react-toastify";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
    withCredentials: true,
});

const API = axios.create({
  baseURL: `${apiRoot}/salary`,
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

export const setLoadingSalaryAction = (loadingValue) => ({
  type: SALARY_ACTION_TYPE.SALARY_LOADING,
  payload: loadingValue,
});

export const getSalaryPaginationAction =
  (teacherId, startDate, endDate, pageNumber, searchQuery) =>
  async (dispatch) => {
    dispatch(setLoadingSalaryAction(true));
    try {
      const { data } = await API.get(
        `?teacherId=${teacherId}&startDate=${startDate}&endDate=${endDate}&page=${pageNumber}&searchQuery=${searchQuery}`
      );
      // console.log(data)
      dispatch({
        type: SALARY_ACTION_TYPE.GET_SALARY_PAGINATION,
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

          dispatch(setLoadingSalaryAction(true));

          const { data } = await API.get(
            `?teacherId=${teacherId}&startDate=${startDate}&endDate=${endDate}&page=${pageNumber}&searchQuery=${searchQuery}`
          );
          dispatch({
            type: SALARY_ACTION_TYPE.GET_SALARY_PAGINATION,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(setLoadingSalaryAction(false));
    }
  };

export const getSalaryTeacherPaginationAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      dispatch(setLoadingSalaryAction(true));

      const { data } = await API.get(
        `/me?startDate=${startDate}&endDate=${endDate}&monthCount=${
          monthCount || ""
        }`
      );
      // console.log(data)
      dispatch({
        type: SALARY_ACTION_TYPE.GET_TEACHER_SALARY_PAGINATION,
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

          dispatch(setLoadingSalaryAction(true));

          const { data } = await API.get(
            `?startDate=${startDate}&endDate=${endDate}&monthCount=${
              monthCount || ""
            }`
          );
          dispatch({
            type: SALARY_ACTION_TYPE.GET_TEACHER_SALARY_PAGINATION,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }

          // console.log(error)
        }
      }
    } finally {
      dispatch(setLoadingSalaryAction(false));
    }
  };
