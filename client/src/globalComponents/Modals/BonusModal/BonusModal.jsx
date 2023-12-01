import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import {
  BONUS_MODAL_ACTION_TYPE,
  DROPDOWN_NAME_ACTION_TYPE,
} from "../../../redux/actions-type";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import TeacherLists from "./components/TeacherLists/TeacherLists";
import { getTeachersAction } from "../../../redux/actions/teachersActions";
import { deletetBonusAction } from "../../../redux/actions/bonusActions";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

export const BonusModal = () => {
  const dispatch = useDispatch();
  const { bonusModalData } = useSelector((state) => state.bonusModal);
  const { teachers } = useSelector((state) => state.teachersPagination);
  const teacherList = teachers?.filter((teacher) => teacher?.status);
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [teacherNameOpen, setTeacherNameOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classIcon, setClassIcon] = useState(false);
  const inputArr = ["amount", "comment"];

  const handleshowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const teacherNameDropdown = () => {
    setTeacherNameOpen(!teacherNameOpen);
    setClassIcon(false);
  };
  const teacherNameAddData = (item) => {
    updateModalState("teacher", item.key);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: item });
    setTeacherNameOpen(false);
    setSelectedTeacherName(item);
  };

  const deleteItem = () => {
    dispatch(deletetBonusAction(bonusModalData._id));
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: {
        data: {
          ...bonusModalData,
          [keyName]: value,
          teacher: selectedTeacherName?._id,
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    dispatch(getTeachersAction());
  }, [dispatch]);

  useEffect(() => {
    if (bonusModalData?._id && teachers) {
      if (bonusModalData.teacher) {
        setSelectedTeacherName(
          teachers.filter((item) => item._id === bonusModalData.teacher)[0]
        );
      }
    }
  }, [teachers]);

  return (
    <div className="create-update-modal-con bonus-modal">
      <div className="create-update-modal ">
        <div className="create-update-modal-head">
          <h2>{bonusModalData?._id ? "Bonus yenilə" : "Bonus yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

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
            {bonusModalData._id ? (
              <TeacherLists
                selectedTeacherName={selectedTeacherName}
                setSelectedTeacherName={setSelectedTeacherName}
                teacherNameDropdown={teacherNameDropdown}
                teacherNameOpen={teacherNameOpen}
                setTeacherNameOpen={setTeacherNameOpen}
                teacherNameAddData={teacherNameAddData}
                teacherList={teacherList}
                funcType="update"
              />
            ) : (
              <TeacherLists
                selectedTeacherName={selectedTeacherName}
                setSelectedTeacherName={setSelectedTeacherName}
                teacherNameDropdown={teacherNameDropdown}
                teacherNameOpen={teacherNameOpen}
                setTeacherNameOpen={setTeacherNameOpen}
                teacherNameAddData={teacherNameAddData}
                teacherList={teacherList}
                funcType="create"
              />
            )}
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

        {bonusModalData?._id ? (
          <SubmitBtn
            funcType="update"
            bonusModalData={bonusModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            funcType="create"
            bonusModalData={bonusModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </div>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
};
