import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createStudentPaymentsAction,
  updateStudentPaymentsAction,
} from "../../../../../redux/actions/studentPaymentsAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";

export default function SubmitBtn({
  formik,
  funcType,
  studentPaymentModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { studentPaymentModalLoading } = useSelector(
    (state) => state.studentPaymentModal
  );
  const { user } = useSelector((state) => state.user);
  const { getFinanceDataAfterCreate } = useCustomHook();
  const objectLength = Object.keys(studentPaymentModalData).length;

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });

  const studentPaymentCreate = () => {
    if (studentPaymentModalData?._id) {
      dispatch(
        updateStudentPaymentsAction(
          studentPaymentModalData?._id,
          studentPaymentModalData
        )
      );
    } else {
      dispatch(
        createStudentPaymentsAction({
          ...studentPaymentModalData,
          branch: user?.branch || "",
        })
      );
    }
    getFinanceDataAfterCreate();
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (Object.keys(formik.errors).length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && objectLength !== 0) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);
  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button
            onClick={studentPaymentCreate}
            disabled={isDisabled || studentPaymentModalLoading}
          >
            {studentPaymentModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>

          <div className="delete-income-modal-btn">
            <DeleteIcon onClick={() => setShowDeleteModal(true)} />
          </div>
          <button
            className="delete-income-modal-btn-mobile"
            onClick={() => setShowDeleteModal(true)}
          >
            Sil
          </button>
        </div>
      ) : (
        <div className="create-update-modal-btn">
          <button
            onClick={studentPaymentCreate}
            disabled={isDisabled || studentPaymentModalLoading}
          >
            {studentPaymentModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
