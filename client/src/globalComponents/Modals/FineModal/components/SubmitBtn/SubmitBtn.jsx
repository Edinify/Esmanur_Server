import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createFineAction,
  updateFineAction,
} from "../../../../../redux/actions/fineActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  funcType,
  fineModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { fineModalLoading } = useSelector((state) => state.fineModal);
  const fineCreate = () => {
    if (fineModalData?._id) {
      dispatch(updateFineAction(fineModalData?._id, fineModalData));
    } else {
      dispatch(createFineAction({ ...fineModalData }));
    }
    // closeModal();
  };
  // console.log(fineModalLoading)
  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button onClick={fineCreate} disabled={fineModalLoading}>
            {fineModalLoading ? (
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
          <button onClick={fineCreate} disabled={fineModalLoading}>
            {fineModalLoading ? (
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
