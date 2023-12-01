import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createExpensesAction,
  updateExpensesAction,
} from "../../../../../redux/actions/expensesAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { useCustomHook } from "../../../../../globalComponents/GlobalFunctions/globalFunctions";

export default function SubmitBtn({
  formik,
  funcType,
  expensesModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { expensesModalLoading } = useSelector((state) => state.expensesModal);
  const { user } = useSelector((state) => state.user);
  const { getFinanceDataAfterCreate } = useCustomHook();
  const objectLength = Object.keys(expensesModalData).length;

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });

  const expensesCreate = () => {
    if (expensesModalData?._id) {
      dispatch(updateExpensesAction(expensesModalData?._id, expensesModalData));
    } else {
      dispatch(
        createExpensesAction({
          ...expensesModalData,
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
            onClick={expensesCreate}
            disabled={isDisabled || expensesModalLoading}
          >
            {expensesModalLoading ? (
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
            onClick={expensesCreate}
            disabled={isDisabled || expensesModalLoading}
          >
            {expensesModalLoading ? (
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
