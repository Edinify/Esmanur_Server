import React from "react";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useDispatch } from "react-redux";

const MaritalStatusCheckbox = ({
  formik,
  teachersModalData,
  setInputValue,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="marital-status">
      <label className="radio-sector-title">Ailə vəziyyəti</label>
      <div className="radio-sector-con">
        <div className="input-box">
          <label>
            <input
              type="radio"
              name="maritalStatus"
              checked={teachersModalData?.maritalStatus === "married"}
              onChange={(e) => {
                dispatch({
                  type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
                  payload: {
                    data: {
                      ...teachersModalData,
                      maritalStatus: e.target.checked && "married",
                    },
                    openModal: true,
                  },
                });

                setInputValue("maritalStatus", "maried");
              }}
            />
            Evli
          </label>
        </div>
        <div className="input-box">
          <label>
            <input
              type="radio"
              name="maritalStatus"
              checked={teachersModalData?.maritalStatus === "single"}
              onChange={(e) => {
                dispatch({
                  type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
                  payload: {
                    data: {
                      ...teachersModalData,
                      maritalStatus: e.target.checked && "single",
                    },
                    openModal: true,
                  },
                });
                setInputValue("maritalStatus", "single");
              }}
            />
            Subay
          </label>
        </div>
      </div>
      {formik.errors.maritalStatus && formik.touched.course && (
        <small className="validation-err-message sector">
          {formik.errors.maritalStatus}
        </small>
      )}
    </div>
  );
};

export default MaritalStatusCheckbox;
