import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { STUDENT_PAYMENT_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import { deleteStudentPaymentsAction } from "../../../redux/actions/studentPaymentsAction";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
export const StudentPaymentModal = () => {
  const dispatch = useDispatch();
  const { studentPaymentModalData } = useSelector(
    (state) => state.studentPaymentModal
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputNameArr = ["appointment", "amount", "date"];

  // formik
  const formik = useFormik({
    initialValues: {
      appointment: studentPaymentModalData?.appointment
        ? studentPaymentModalData?.appointment
        : "",
      amount: studentPaymentModalData?.amount
        ? studentPaymentModalData?.amount
        : "",
      date: studentPaymentModalData?.date ? studentPaymentModalData?.date : "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const deleteItem = () => {
    dispatch(deleteStudentPaymentsAction(studentPaymentModalData._id));
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.GET_STUDENT_PAYMENT_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.GET_STUDENT_PAYMENT_MODAL,
      payload: {
        data: { ...studentPaymentModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.GET_STUDENT_PAYMENT_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {studentPaymentModalData?._id ? "Məhsulu yenilə" : "Məhsul yaradın"}
          </h2>
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
            {inputNameArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                studentPaymentModalData={studentPaymentModalData}
                updateModalState={updateModalState}
                formik={formik}
                setInputValue={setInputValue}
              />
            ))}
          </div>
        </Box>

        {studentPaymentModalData?._id ? (
          <SubmitBtn
            formik={formik}
            funcType="update"
            studentPaymentModalData={studentPaymentModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            funcType="create"
            studentPaymentModalData={studentPaymentModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        {showDeleteModal && (
          <DeleteItemModal
            setShowDeleteModal={setShowDeleteModal}
            deleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
};
