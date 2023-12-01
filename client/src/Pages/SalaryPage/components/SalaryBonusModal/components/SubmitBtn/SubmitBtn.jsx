import React from "react";
import { useDispatch } from "react-redux";
import { createSalaryBonusAction,updateBonusAction } from "../../../../../../redux/actions/bonusActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../../redux/actions-type";
import { getSalaryPaginationAction } from "../../../../../../redux/actions/salaryActions";

export default function SubmitBtn({funcType, bonusModalData, closeModal }) {
  const dispatch = useDispatch();

  const bonusCreate = () => {
      dispatch({type:SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE,payload:""})
      dispatch(createSalaryBonusAction({ ...bonusModalData }));
    closeModal();
  };
  return (
    <>
    {funcType ==="update"
    ?
     <div className="create-update-modal-btn update">
     <button
       onClick={bonusCreate}
     >
       Yenilə
     </button>
   </div>
  :
  <div className="create-update-modal-btn">
  <button
    onClick={bonusCreate}
    
  >
    Yarat
  </button>
</div>
  }
   
    </>
  );
}
