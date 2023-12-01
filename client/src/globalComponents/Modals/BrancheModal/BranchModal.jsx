import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { BRANCHES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import SubmitBtn from "./components/SubmitBtn";
import InputField from "./components/InputField";

export const BranchModal = () => {
  const dispatch = useDispatch();
  const { branchesModalData } = useSelector((state) => state.branchesModal);

  const closeModal = () => {
    dispatch({
      type: BRANCHES_MODAL_ACTION_TYPE.GET_BRANCH_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{branchesModalData?._id ? "Filial yenilə" : "Filial yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <InputField
              branchesModalData={branchesModalData}
              inputName={"name"}
            />
          </div>
        </Box>

        {branchesModalData?._id ? (
          <SubmitBtn
            branchesModalData={branchesModalData}
            funcType="update"
            closeModal={closeModal}
          />
        ) : (
          <SubmitBtn
            branchesModalData={branchesModalData}
            funcType="create"
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};
