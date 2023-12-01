import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";

export default function InputField({
  formik,
  setInputValue,
  foodRationModalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "name",
      label: "Qidanın adı",
      type: "string",
      marginTop: "0",
      marginBottom: "0",
      inputValue: foodRationModalData[inputName] || "",
    },
    {
      inputName: "amount",
      label: "Xərcin qiyməti",
      type: "number",
      marginTop: "20px",
      marginBottom: "0",
      inputValue: foodRationModalData[inputName] || "",
    },
    {
      inputName: "quantity",
      label: "Miqdarı",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: foodRationModalData[inputName] || "",
    },
    {
      inputName: "unitAmount",
      label: "Vahidin qiyməti",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: foodRationModalData[inputName] || "",
    },
    {
      inputName: "date",
      label: "Xərcin tarixi",
      type: "date",
      marginTop: "20px",
      marginBottom: "0",
      inputValue:
        foodRationModalData[inputName] && inputName === "date"
          ? moment(foodRationModalData[inputName]).format("YYYY-MM-DD")
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
