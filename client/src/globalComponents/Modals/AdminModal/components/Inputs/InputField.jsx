import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";
import { ReactComponent as ManatIcon } from "../../../../../assets/icons/manat.svg";
import { ReactComponent as ModalArrowIcon } from "../../../../../assets/icons/modal-arrow-down.svg";
import { ADMINS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useDispatch } from "react-redux";

export default function InputField({
  formik,
  setInputValue,
  adminsModalData,
  inputName,
}) {
  const dispatch = useDispatch();
  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  const inputData = [
    {
      inputName: "fullName",
      label: "Ad soyad",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: adminsModalData[inputName] || "",
    },
    {
      inputName: "email",
      label: "Email",
      type: "email",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: adminsModalData[inputName] || "",
    },
    {
      inputName: "password",
      label: !adminsModalData._id ? "Şifrə" : "Şifrəni dəyiş",
      type: viewPass ? "password" : "text",
      marginTop: "24px",
      marginBottom: "0",
      paddingRight: "50px",
      className: "password-input",
    },
  ];

  const handleChange = (e) => {
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL,
      payload: {
        data: { ...adminsModalData, [inputName]: e.target.value },
        openModal: true,
      },
    });
    setInputValue(inputName, e.target.value);
  };

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName).className
      }
    >
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop: inputData.find((item) => item.inputName === inputName)
            .marginTop,
          marginBottom: inputData.find((item) => item.inputName === inputName)
            ?.marginBottom,
        }}
        InputLabelProps={{
          shrink: inputData.find((item) => item.inputName === inputName)
            .inputValue
            ? true
            : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              .marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName).type}
        label={inputData.find((item) => item.inputName === inputName).label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        onWheel={(e) => e.target.blur()}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {inputName === "password" && adminsModalData?._id
        ? formik.errors[inputName] &&
          formik.errors[inputName] !== "Bu xana tələb olunur." &&
          formik.touched[inputName] && (
            <small className="validation-err-message">
              {formik.errors[inputName]}
            </small>
          )
        : formik.errors[inputName] &&
          formik.touched[inputName] && (
            <small className="validation-err-message">
              {formik.errors[inputName]}
            </small>
          )}

      {inputName === "password" && (
        <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
          {viewPass ? <EyeSlash /> : <Eye />}
        </div>
      )}
    </div>
  );
}
