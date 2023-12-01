import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";

export default function InputField({
  formik,
  setInputValue,
  uniformModalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "childName",
      label: "Uşağın adı",
      type: "string",
      marginTop: "0",
      marginBottom: "0",
      inputValue: uniformModalData[inputName] || "",
    },
    {
      inputName: "count",
      label: "Formaların sayı",
      type: "number",
      marginTop: "20px",
      marginBottom: "0",
      inputValue: uniformModalData[inputName] || "",
    },
    {
      inputName: "outPrice",
      label: "Satış qiyməti",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: uniformModalData[inputName] || "",
    },
    {
      inputName: "inPrice",
      label: "Alış qiyməti",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: uniformModalData[inputName] || "",
    },
    {
      inputName: "childPrice",
      label: "Uşağın ödənişi",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: uniformModalData[inputName] || "",
    },
    {
      inputName: "date",
      label: "Tarixi",
      type: "date",
      marginTop: "20px",
      marginBottom: "0",
      inputValue:
        uniformModalData[inputName] && inputName === "date"
          ? moment(uniformModalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
  ];

  return (
    <>
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
          shrink:
            inputName === "date"
              ? true
              : inputData.find((item) => item.inputName === inputName)
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
        onChange={(e) => {
          updateModalState(inputName, e.target.value);
          setInputValue(inputName, e.target.value);
        }}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />
      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </>
  );
}
