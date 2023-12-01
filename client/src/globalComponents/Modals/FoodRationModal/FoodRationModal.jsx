import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { FOOD_RATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import { deleteFoodRationAction } from "../../../redux/actions/foodRationAction";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
export const FoodRationModal = () => {
  const dispatch = useDispatch();
  const { foodRationModalData } = useSelector((state) => state.foodRationModal);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputNameArr = ["name", "quantity", "unitAmount", "amount", "date"];

  // formik
  const formik = useFormik({
    initialValues: {
      name: foodRationModalData?.name ? foodRationModalData?.name : "",
      amount: foodRationModalData?.amount ? foodRationModalData?.amount : "",
      quantity: foodRationModalData?.quantity
        ? foodRationModalData?.quantity
        : "",
      unitAmount: foodRationModalData?.unitAmount
        ? foodRationModalData?.unitAmount
        : "",

      date: foodRationModalData?.date ? foodRationModalData?.date : "",
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
    dispatch(deleteFoodRationAction(foodRationModalData._id));
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.GET_FOOD_RATION_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.GET_FOOD_RATION_MODAL,
      payload: {
        data: { ...foodRationModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.GET_FOOD_RATION_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {foodRationModalData?._id ? "Məhsulu yenilə" : "Məhsul yaradın"}
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
                foodRationModalData={foodRationModalData}
                updateModalState={updateModalState}
                formik={formik}
                setInputValue={setInputValue}
              />
            ))}
          </div>
        </Box>

        {foodRationModalData?._id ? (
          <SubmitBtn
            formik={formik}
            funcType="update"
            foodRationModalData={foodRationModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            funcType="create"
            foodRationModalData={foodRationModalData}
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
