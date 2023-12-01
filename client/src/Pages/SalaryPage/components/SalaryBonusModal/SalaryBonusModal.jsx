import "./salaryBonusModal.css";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/more-modal/x-close.svg";
import { ReactComponent as ManatIcon } from "../../../../assets/icons/manat.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/Delete button.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/bonus/plus-circle.svg";

import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import InputField from "./components/InputField/InputField";

import { Box } from "@mui/material";
import SalaryBonusDeleteModal from "./components/SalaryBonusDeleteModal/SalaryBonusDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { BONUS_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

const SalaryBonusModal = ({ setOpenBonusModal, salary, openBonusModal,setBonusEditModal }) => {
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
    setOpenBonusModal(false);
    document.body.style.overflowY = "overlay";
  };

  return (
    <>
      <div className="salary-plus-icon">
        <PlusIcon onClick={() => {
          setBonusEditModal(false)
          setOpenBonusModal(!openBonusModal)}} />
      </div>

      {openBonusModal && (
        <div className="salary-bonus-modal">
          <div className="salary-bonus-con">
            <div className="salary-modal-header">
              <h2>Bonus əlavə et</h2>
              <div className="salary-modal-header-icons">
                  <CloseIcon onClick={() => setOpenBonusModal(false)} />
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
          
        
          <SubmitBtn
            funcType="create"
            bonusModalData={bonusModalData}
            closeModal={closeModal}

          />
           
          

          </div>
          {/* {deleteBonus && <SalaryBonusDeleteModal setDeleteBonus={setDeleteBonus} />} */}
        </div>
      )}
    </>
  );
};

export default SalaryBonusModal;
