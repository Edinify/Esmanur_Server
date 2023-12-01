import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { UNIFORMS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import { deleteUniformAction } from "../../../redux/actions/uniformsAction";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
export const UniformsModal = () => {
  const dispatch = useDispatch();
  const { uniformModalData } = useSelector((state) => state.uniformModal);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputNameArr = [
    "childName",
    "count",
    "outPrice",
    "inPrice",
    "childPrice",
    "date",
  ];

  // formik
  const formik = useFormik({
    initialValues: {
      childName: uniformModalData?.childName ? uniformModalData?.childName : "",
      count: uniformModalData?.count ? uniformModalData?.count : "",
      outPrice: uniformModalData?.outPrice ? uniformModalData?.outPrice : "",
      inPrice: uniformModalData?.inPrice ? uniformModalData?.inPrice : "",
      childPrice: uniformModalData?.childPrice
        ? uniformModalData?.childPrice
        : "",
      date: uniformModalData?.date ? uniformModalData?.date : "",
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
    dispatch(deleteUniformAction(uniformModalData._id));
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL,
      payload: {
        data: { ...uniformModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{uniformModalData?._id ? "Forma yenilə" : "Forma yaradın"}</h2>
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
                uniformModalData={uniformModalData}
                updateModalState={updateModalState}
                formik={formik}
                setInputValue={setInputValue}
              />
            ))}
          </div>
        </Box>

        {uniformModalData?._id ? (
          <SubmitBtn
            formik={formik}
            funcType="update"
            uniformModalData={uniformModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            funcType="create"
            uniformModalData={uniformModalData}
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
