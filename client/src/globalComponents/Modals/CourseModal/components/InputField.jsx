import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

export default function InputField({
  setInputValue,
  setCategoryItem,
  coursesModalData,
  formik,
  inputName,
  categoryItem,
}) {

  const dispatch = useDispatch();
  const labelArr = [
    { name: "name", label: "Fənn adı" },
    { name: "category", label: "Səviyyə" },
  ];
  const inputValue = inputName === "name" ? coursesModalData[inputName] || "" : categoryItem;

  const nameOnChange = (e) => {
    dispatch({type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL, payload:{data: {...coursesModalData, name: e.target.value}, openModal: true} })
    setInputValue(inputName, e.target.value);
  };

  const categoryOnChange = (e) => {
    setCategoryItem(e.target.value);
  };
  return (
    <>
      <TextField
        sx={{
          "& input": {
            fontSize: "16px",
          },
          marginTop: inputName === "name" ? "15px" : "20px",
        }}
        InputLabelProps={{
          style: { fontSize: "12px", color: "#3F3F3F" },
        }}
        autoComplete="off"
        fullWidth
        label={labelArr.find((item) => item.name === inputName).label}
        id={inputName}
        name={inputName}
        variant="outlined"
        value={inputValue}
        onChange={(e) => inputName === "name" ? nameOnChange(e) : categoryOnChange(e)}
        onBlur={() => inputName === "name" && formik.setFieldTouched(inputName, true)}
      />
      {inputName === 'name' &&
         formik.errors[inputName] && formik.touched[inputName] && (
            <small className="validation-err-message">
              {formik.errors[inputName]}
            </small>
          )
      }
    </>
  );
}
