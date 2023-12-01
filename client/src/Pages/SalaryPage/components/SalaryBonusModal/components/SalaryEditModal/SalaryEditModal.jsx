import React, { useState } from "react";
import "../../salaryBonusModal.css";
import { ReactComponent as CloseIcon } from "../../../../../../assets/icons/more-modal/x-close.svg";
import { ReactComponent as BonusEditIcon } from "../../../../../../assets/icons/bonus/edit-02.svg";

import SubmitBtn from "../SubmitBtn/SubmitBtn";
import InputField from "../InputField/InputField";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BONUS_MODAL_ACTION_TYPE } from "../../../../../../redux/actions-type";

const SalaryEditModal = ({
  setBonusEditModal,
  salary,
  bonusEditModal,
  setOpenBonusModal,
}) => {
  const dispatch = useDispatch();
  const { bonusModalData } = useSelector((state) => state.bonusModal);
  const inputArr = ["amount", "comment"];


  const updateModalState = (keyName, value) => {
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: {
        data: {
          ...bonusModalData,
          [keyName]: value,
          teacher: salary?._id,
        },
      },
    });
  };

  const closeModal = () => {
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: { data: {} },
    });
    setBonusEditModal(false);
    document.body.style.overflowY = "overlay";
  };

  return (
    <>
      <div className="salary-plus-icon">
        <BonusEditIcon
          onClick={() => {
            setOpenBonusModal(false);
            setBonusEditModal(!bonusEditModal);
          }}
        />
      </div>

      {bonusEditModal && (
        <div className="salary-bonus-modal edit-bonus-modal ">
          <div className="salary-bonus-con">
            <div className="salary-modal-header">
              <h2>Bonus yenilə</h2>
              <div className="salary-modal-header-icons">
                <div className="header-icon-close">
                  <CloseIcon onClick={() => setBonusEditModal(false)} />
                </div>
              </div>
            </div>
            <div className="salary-bonus-inputs">
              <Box
                onSubmit={(e) => e.preventDefault()}
                component="form"
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div className="create-update-modal-form">
                  {inputArr.map((name, index) => (
                    <InputField
                      key={index}
                      inputName={name}
                      bonusModalData={bonusModalData}
                      updateModalState={updateModalState}
                    />
                  ))}
                </div>
              </Box>
            </div>
            <div className="salary-edit-btns">
              <SubmitBtn
                funcType="update"
                bonusModalData={bonusModalData}
                closeModal={closeModal}
              />
              {/* <DeleteIcon onClick={() => setDeleteBonus(true)} /> */}
            </div>
          </div>
          {/* {deleteBonus && (
            <SalaryBonusDeleteModal setDeleteBonus={setDeleteBonus} />
          )} */}
        </div>
      )}
    </>
  );
};

export default SalaryEditModal;
