import axios from "axios";
import {
  ALL_COURSES_ACTION,
  COURSES_ALL_ACTIONS_TYPE,
  COURSES_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/course`,
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

const coursesPageLoading = (loadingValue) => ({
  type: COURSES_ALL_ACTIONS_TYPE.COURSE_LOADING,
  payload: loadingValue,
});
const courseModalLoading = (loadingValue) => ({
  type: COURSES_MODAL_ACTION_TYPE.COURSE_MODAL_LOADING,
  payload: loadingValue,
});
const courseModalOpen = (value) => ({
  type: COURSES_MODAL_ACTION_TYPE.COURSE_OPEN_MODAL,
  payload: value,
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

export const allCoursesAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/");
    dispatch({ type: ALL_COURSES_ACTION.GET_ALL_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesPaginationAction =
  (pageNumber, searchQuery) => async (dispatch) => {
    dispatch(coursesPageLoading(true));
    try {
      const { data } = await API.get(
        `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}`
      );
      dispatch({
        type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch({
        type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION,
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
            `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}`
          );
          dispatch({
            type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_LAST_PAGE,
            payload: pageNumber,
          });
          dispatch({
            type: COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION,
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
    } finally {
      dispatch(coursesPageLoading(false));
    }
  };
export const createCoursesAction = (courseData) => async (dispatch) => {
  dispatch(courseModalLoading(true));
  try {
    const { data } = await API.post("/", courseData);
    dispatch(getCoursesPaginationAction(data.lastPage, ""));
    dispatch(courseModalOpen(false));
    toastSuccess("Yeni fənn yaradıldı");
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
        const { data } = await API.post("/", courseData);
        dispatch(getCoursesPaginationAction(data.lastPage, ""));
        dispatch(courseModalOpen(false));
        toastSuccess("Yeni fənn yaradıldı");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.status === 403){
      dispatch(logoutAction())
    }
    console.log(error);
    if (error?.response?.data?.key === "course-already-exists") {
      toastError("Bu ad ilə fənn artıq mövcuddur");
    }
  } finally {
    dispatch(courseModalLoading(false));
  }
};
export const updateCoursesAction = (_id, courseData) => async (dispatch) => {
  dispatch(courseModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, courseData);
    dispatch({ type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE, payload: data });
    dispatch(courseModalOpen(false));
    toastSuccess("Fənn yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, courseData);
        dispatch({
          type: COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE,
          payload: data,
        });
        dispatch(courseModalOpen(false));
        toastSuccess("Fənn yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    console.log(error);
    toastError(error?.response?.data?.message);
    if (error?.response?.data?.key === "course-already-exists") {
      dispatch(courseModalOpen(true));
      toastError("Fənn artıq mövcuddur");
    }
  } finally {
    dispatch(courseModalLoading(false));
  }
};

export const deleteCoursesAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE, payload: _id });
    toastSuccess("Fənn silindi");
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
        dispatch({
          type: COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE,
          payload: _id,
        });
        toastSuccess("Fənn silindi");
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
