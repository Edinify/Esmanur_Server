import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import { createUniformAction, updateUniformAction } from "../../../../../redux/actions/uniformsAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";

export default function SubmitBtn({
  formik,
  funcType,
  uniformModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { uniformModalLoading } = useSelector(
    (state) => state.uniformModal
  );
  const { user } = useSelector((state) => state.user);
  const { getFinanceDataAfterCreate } = useCustomHook();
  const objectLength = Object.keys(uniformModalData).length;

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });

  const expensesCreate = () => {
    if (uniformModalData?._id) {
      dispatch(
        updateUniformAction(uniformModalData?._id, uniformModalData)
      );
    } else {
      dispatch(createUniformAction({ ...uniformModalData, branch: user?.branch || ""  }));
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
            disabled={isDisabled || uniformModalLoading}
          >
            {uniformModalLoading ? (
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
            disabled={isDisabled || uniformModalLoading}
          >
            {uniformModalLoading ? (
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
