import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createIncomesAction,
  updateIncomesAction,
} from "../../../../../redux/actions/incomeActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { useCustomHook } from "../../../../../globalComponents/GlobalFunctions/globalFunctions";

export default function SubmitBtn({
  formik,
  funcType,
  incomesModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { incomesModalLoading } = useSelector((state) => state.incomesModal);
  const { user } = useSelector((state) => state.user);
  const { getFinanceDataAfterCreate } = useCustomHook();
  const objectLength = Object.keys(incomesModalData).length;

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const incomesCreate = () => {
    if (incomesModalData?._id) {
      dispatch(updateIncomesAction(incomesModalData?._id, incomesModalData));
    } else {
      dispatch(
        createIncomesAction({ ...incomesModalData, branch: user?.branch || "" })
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
            disabled={isDisabled || incomesModalLoading}
            onClick={incomesCreate}
          >
            {incomesModalLoading ? (
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
            disabled={isDisabled || incomesModalLoading}
            onClick={incomesCreate}
          >
            {incomesModalLoading ? (
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
