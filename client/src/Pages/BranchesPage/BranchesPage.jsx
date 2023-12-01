import React, { useEffect } from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/Plus.svg";
import { useSelector, useDispatch } from "react-redux";
import BranchesData from "./components/BranchesData";
import { BRANCHES_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const BranchesPage = () => {
  const dispatch = useDispatch();
  const openBranchModal = () => {
    dispatch({
      type: BRANCHES_MODAL_ACTION_TYPE.GET_BRANCH_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  return (
    <div className="details-page branches-page">
      <GlobalHead openModal={openBranchModal} search={false} />
      <BranchesData />
    </div>
  );
};

export default BranchesPage;
