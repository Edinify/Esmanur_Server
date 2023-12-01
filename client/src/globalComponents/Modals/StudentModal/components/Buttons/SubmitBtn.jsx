import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudentsAction,
  createStudentsAction,
} from "../../../../../redux/actions/studentsActions";
import { SEARCH_VALUES_ACTION_TYPES, STUDENTS_MODAL_ACTION_TYPE} from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, studentsModalData, funcType, closeModal }) => {
  const dispatch = useDispatch();
  const { studentsModalLoading } = useSelector((state) => state.studentsModal);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const studentCreate = () => {
    if (studentsModalData?._id) {
      dispatch(updateStudentsAction(studentsModalData?._id, studentsModalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.STUDENTS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createStudentsAction({
          ...studentsModalData,
        })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (
          Object.keys(formik.errors).length === 0 &&
          studentsModalData?.fullName
        ) {
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && studentsModalData?.fullName) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);

  return (
    <div className="create-update-modal-btn">
      <button disabled={isDisabled || studentsModalLoading} onClick={studentCreate}>
        {studentsModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
};

export default SubmitBtn;
