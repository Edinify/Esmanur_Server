import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createBonusAction,
  updateBonusAction,
} from "../../../../../redux/actions/bonusActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  funcType,
  bonusModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { bonusesModalLoading } = useSelector((state) => state.bonusModal);

  const bonusCreate = () => {
    if (bonusModalData?._id) {
      dispatch(updateBonusAction(bonusModalData?._id, bonusModalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createBonusAction({ ...bonusModalData }));
    }
  };

  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button onClick={bonusCreate} disabled={bonusesModalLoading}>
            {bonusesModalLoading ? (
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
          <button onClick={bonusCreate} disabled={bonusesModalLoading}>
            {bonusesModalLoading ? (
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
