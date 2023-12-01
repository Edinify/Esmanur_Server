import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSES_MODAL_ACTION_TYPE,
  SEARCH_VALUES_ACTION_TYPES,
} from "../../../../redux/actions-type";
import {
  createCoursesAction,
  updateCoursesAction,
} from "../../../../redux/actions/coursesActions";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  formik,
  coursesModalData,
  funcType,
}) {
  const dispatch = useDispatch();
  const { coursesModalLoading } = useSelector((state) => state.coursesModal);
  const classCreate = () => {
    if (coursesModalData?._id) {
      dispatch(
        updateCoursesAction(coursesModalData?._id, coursesModalData)
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.COURSES_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createCoursesAction(coursesModalData));
    }
    // closeModal();
  };
  return (
    <div className="create-update-modal-btn">
      <button
        disabled={!(formik.isValid && coursesModalData?.name && !coursesModalLoading)}
        onClick={classCreate}
      >
        {coursesModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
}
