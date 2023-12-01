import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranchAction,
  updateBranchAction,
} from "../../../../redux/actions/branchesActions";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({ branchesModalData, funcType }) {
  const dispatch = useDispatch();
  const { branchesModalLoading } = useSelector((state) => state.branchesModal);

  const branchCreate = () => {
    if (branchesModalData?._id) {
      dispatch(updateBranchAction(branchesModalData?._id, branchesModalData));
    } else {
      dispatch(createBranchAction(branchesModalData));
    }
  };

  return (
    <div className="create-update-modal-btn">
      <button onClick={() => branchCreate()}>
        {branchesModalLoading ? (
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
