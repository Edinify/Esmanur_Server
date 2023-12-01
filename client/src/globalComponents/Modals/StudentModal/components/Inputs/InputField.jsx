import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";

export default function InputField({
  formik,
  setInputValue,
  studentsModalData,
  inputName,
  updateModalState
}) {

  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  const inputData = [
    {
      inputName: "fullName",
      label: "Ad soyad",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "birthday",
      label: "Doğum tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: (studentsModalData[inputName] && inputName === "birthday")
        ? moment(studentsModalData[inputName]).format("YYYY-MM-DD")
        : "",
    },
    {
      inputName: "healthStatus",
      label: "Sağlamlıq statusu",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "educationalInstitution",
      label: "Təhsil aldığı müəssisə",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "educationDegree",
      label: "Təhsil dərəcəsi / Sinif",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "motherName",
      label: "Ana adı",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "fatherName",
      label: "Ata adı",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "fin",
      label: "FIN",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "seria",
      label: "Seria nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "motherPhone",
      label: "Ana telefon nömrəsi",
      type: "tel",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "fatherPhone",
      label: "Ata telefon nömrəsi",
      type: "tel",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "emergencyPhone",
      label: "Telefon nömrəsi / təcili",
      type: "tel",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "email",
      label: "Email",
      type: "email",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
    {
      inputName: "password",
      label: !studentsModalData._id ? "Şifrə" : "Şifrəni dəyiş",
      type: viewPass ? "password" : "text",
      marginTop: "24px",
      marginBottom: "0",
      paddingRight: '50px'
    },
    {
      inputName: "payment",
      label: "1 dərsin qiyməti",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: studentsModalData[inputName] || "",
    },
  ];


  return (
    <div className={inputName === 'password' ? "password-input" : ''}>
      <TextField
        sx={{
          "& input": { fontSize: "12px",
        paddingRight: inputData.find((item) => item.inputName === inputName)?.paddingRight },
          marginTop: inputData.find((item) => item.inputName === inputName).marginTop,
        }}
        InputLabelProps={{
          shrink:
            inputName === "birthday"
              ? true
              : (inputData.find((item) => item.inputName === inputName)
                  .inputValue
              ? true
              : shrink),
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
        onChange={(e) => {
          updateModalState(inputName, e.target.value)
          setInputValue(inputName, e.target.value);
        }}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
        autoComplete={inputName === 'password' ? 'current-password' : 'on'}
      />

      {(inputName === 'password' && studentsModalData?._id) ?
        (
          (formik.errors[inputName] && formik.errors[inputName] !== 'Bu xana tələb olunur.') && 
          formik.touched[inputName] && 
          (<small className="validation-err-message">{formik.errors[inputName]}</small>)
        ) :
        (
          (formik.errors[inputName]) && 
          formik.touched[inputName] && 
          (<small className="validation-err-message">{formik.errors[inputName]}</small>)
        )
      } 

      {inputName === 'password' &&
      <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
        {viewPass ? <EyeSlash /> : <Eye />}
      </div>
      }
    </div>
  );
}
