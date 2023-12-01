import axios from "axios";
import { DASHBOARD_ACTIONS_TYPE } from "../actions-type";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/dashboard`,
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

export const getDashboardConfirmedLessonsAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/confirmed/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CONFIRMED_LESSONS,
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
            `/confirmed/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CONFIRMED_LESSONS,
            payload: data,
          });
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
    }
  };

export const getDashboardCancelledLessonsAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/cancelled/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data,"cancelled")
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CANCELLED_LESSONS,
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
            `/cancelled/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          // console.log(data,"cancelled")
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CANCELLED_LESSONS,
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

export const getDashboardUnviewedLessonsAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/unviewed/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data,"unviewed")
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_UNVIEWED_LESSONS,
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
            `/unviewed/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          // console.log(data,"unviewed")
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_UNVIEWED_LESSONS,
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

export const getDashboardFinanceAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/finance");
    dispatch({
      type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_FINANCE,
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

        const { data } = await API.get("/finance");
        dispatch({
          type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_FINANCE,
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

export const getDashboardCourseStatisticAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/course-statistic/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data)
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_COURSE_STATISTIC,
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
            `/course-statistic/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          // console.log(data)
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_COURSE_STATISTIC,
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

export const getDashboardAdvertisingAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/advertising/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data)
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_ADVERTISING,
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
            `/advertising/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          // console.log(data)
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_ADVERTISING,
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

export const getDashboarLeadboarddAction =
  (startDate, endDate, monthCount, byFilter) => async (dispatch) => {

    // console.log(startDate, endDate, monthCount, byFilter);

    try {
      const { data } = await API.get(
        `/leadboard/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount}&byFilter=${byFilter}`
      );
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_LEADBOARD,
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
            `/leadboard/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount}&byFilter=${byFilter}`
          );
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_LEADBOARD,
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

export const getDashboardStudentsAmountAction =
  (startDate = "", endDate = "", monthCount) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `/chart/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data)
      dispatch({
        type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_STUDENTS_AMOUNT,
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
            `/chart/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          // console.log(data)
          dispatch({
            type: DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_STUDENTS_AMOUNT,
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
