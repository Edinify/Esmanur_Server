import axios from "axios";
import {
  BONUS_MODAL_ACTION_TYPE,
  BONUS_PAGINATION_ACTION_TYPE,
  TEACHER_BONUS_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";
import { getSalaryPaginationAction } from "./salaryActions";

const API = axios.create({
  baseURL: `${apiRoot}/bonus`,
  withCredentials:true
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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

export const setLoadingBonusAction = (loadingValue) => ({
  type: BONUS_PAGINATION_ACTION_TYPE.BONUS_LOADING,
  payload: loadingValue,
});

const bonusModalLoading = (loadingValue) => ({
  type: BONUS_MODAL_ACTION_TYPE.BONUS_MODAL_LOADING,
  payload: loadingValue,
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

export const getTeacherBonusAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    dispatch(setLoadingBonusAction(true));
    try {
      const { data } = await API.get(
        `/me?startDate=${startDate || ""}&endDate=${endDate || ""}&monthCount=${
          monthCount || ""
        }`
      );

      dispatch({
        type: TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_BONUS,
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
            `/me?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );

          dispatch({
            type: TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_BONUS,
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
      dispatch(setLoadingBonusAction(false));
    }
  };

export const getBonusPaginationAction =
  (page = 1, searchQuery = "", startDate = "", endDate = "") =>
  async (dispatch) => {
    dispatch(setLoadingBonusAction(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&searchQuery=${searchQuery}&startDate=${
          startDate || ""
        }&endDate=${endDate || ""}`
      );

      dispatch({
        type: BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_PAGINATION,
        payload: data,
      });
    } catch (error) {
      if (error?.response?.data?.key === "bonus-already-exist") {
        toastError("Bu ay ərzində müəllimin bonusu var");
      }
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
            `/?page=${page}&searchQuery=${searchQuery}&startDate=${
              startDate || ""
            }&endDate=${endDate || ""}`
          );

          dispatch({
            type: BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: BONUS_PAGINATION_ACTION_TYPE.GET_BONUS_PAGINATION,
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
      dispatch(setLoadingBonusAction(false));
    }
  };
//
export const createBonusAction = (bonusData) => async (dispatch) => {
  dispatch(bonusModalLoading(true));
  try {
    const { data } = await API.post("/", bonusData);

    dispatch(getBonusPaginationAction(data.lastPage, "", "", ""));
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.BONUS_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni Bonus əlavə edildi");
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.key === "bonus-already-exist") {
      toastError("Bu ay ərzində müəllimin bonusu var");
    }
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

        const { data } = await API.post("/", bonusData);

        dispatch(getBonusPaginationAction(data.lastPage, "", "", ""));
        dispatch({
          type: BONUS_MODAL_ACTION_TYPE.BONUS_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni Bonus əlavə edildi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if(error?.response?.data?.message==="Bonus validation failed: teacher: Path `teacher` is required."){
      toastError("Müəllim adı düzgün daxil edilməyib")
    }
  } finally {
    dispatch(bonusModalLoading(false));
  }
};

export const createSalaryBonusAction = (bonusData) => async (dispatch) => {
  try {
    const { data } = await API.post("/on-salary", bonusData);

    dispatch(getBonusPaginationAction(data.lastPage, "", "", ""));
    dispatch(getSalaryPaginationAction("", "", "", 1, ""))
    toastSuccess("Yeni Bonus əlavə edildi");
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.key === "bonus-already-exist") {
      toastError("Bu ay ərzində müəllimin bonusu var");
    }
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
        const { data } = await API.post("/on-salary", bonusData);

        dispatch(getBonusPaginationAction(data.lastPage, "", "", ""));
        toastSuccess("Yeni Bonus əlavə edildi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const updateBonusAction = (_id, bonusData) => async (dispatch) => {
  dispatch(bonusModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, bonusData);
    dispatch({
      type: BONUS_PAGINATION_ACTION_TYPE.UPDATE_BONUS,
      payload: data,
    });
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.BONUS_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Bonus yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, bonusData);
        // console.log(data,"update");

        dispatch({
          type: BONUS_PAGINATION_ACTION_TYPE.UPDATE_BONUS,
          payload: data,
        });
        dispatch({
          type: BONUS_MODAL_ACTION_TYPE.BONUS_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Bonus yeniləndi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if(error?.response?.data?.message==="Bonus validation failed: teacher: Path `teacher` is required."){
      toastError("Müəllim adı düzgün daxil edilməyib")
    }
  } finally {
    dispatch(bonusModalLoading(false));
  }
};

export const deletetBonusAction = (_id) => async (dispatch) => {
  // console.log(_id, "delete bonus");
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: BONUS_PAGINATION_ACTION_TYPE.DELETE_BONUS, payload: _id });
    dispatch(getBonusPaginationAction(1, "", "", ""));

    toastSuccess("Bonus silindi");
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
          type: BONUS_PAGINATION_ACTION_TYPE.DELETE_BONUS,
          payload: _id,
        });
        dispatch(getBonusPaginationAction(1, "", "", ""));

        toastSuccess("Bonus silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
