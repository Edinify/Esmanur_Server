import axios from "axios";
import {
  STUDENT_PAYMENTS_ACTION_TYPE,
  STUDENT_PAYMENT_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/expense`,
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

const pageLoading = (loadingValue) => ({
  type: STUDENT_PAYMENTS_ACTION_TYPE.STUDENT_PAYMENTS_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_MODAL_LOADING,
  payload: loadingValue,
});

export const getStudentPaymentsPaginationAction =
  (page = 1, startDate, endDate, monthCount) =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      // console.log(data,"get")

      dispatch({
        type: STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_PAGINATION,
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
            type: STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: STUDENT_PAYMENTS_ACTION_TYPE.GET_STUDENT_PAYMENTS_PAGINATION,
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
      dispatch(pageLoading(false));
    }
  };

export const createStudentPaymentsAction = (studentPaymentsData) => async (dispatch) => {
  // console.log(studentPaymentsData);
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", studentPaymentsData);

    dispatch(getStudentPaymentsPaginationAction(data.lastPage, "", "", 1));

    // console.log(data);
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_OPEN_MODAL,
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

        const { data } = await API.post("/", studentPaymentsData);
        console.log(data, "xeeeerc");

        dispatch(getStudentPaymentsPaginationAction(data.lastPage, "", "", 1));
        dispatch({
          type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_OPEN_MODAL,
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
    dispatch(modalLoading(false));
  }
};

export const updateStudentPaymentsAction = (_id, studentPaymentsData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, studentPaymentsData);
    dispatch({
      type: STUDENT_PAYMENTS_ACTION_TYPE.UPDATE_STUDENT_PAYMENTS,
      payload: data,
    });
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_OPEN_MODAL,
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
        const { data } = await API.patch(`/${_id}`, studentPaymentsData);
        dispatch({
          type: STUDENT_PAYMENTS_ACTION_TYPE.UPDATE_STUDENT_PAYMENTS,
          payload: data,
        });
        dispatch({
          type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.STUDENT_PAYMENT_OPEN_MODAL,
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
    dispatch(modalLoading(false));
  }
};

export const deleteStudentPaymentsAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({
      type: STUDENT_PAYMENTS_ACTION_TYPE.DELETE_STUDENT_PAYMENTS,
      payload: _id,
    });

    dispatch(getStudentPaymentsPaginationAction(1, "", "", 1));
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
          type: STUDENT_PAYMENTS_ACTION_TYPE.DELETE_STUDENT_PAYMENTS,
          payload: _id,
        });

        dispatch(getStudentPaymentsPaginationAction(1, "", "", 1));
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
