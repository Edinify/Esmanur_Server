import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { BRANCHES_MODAL_ACTION_TYPE, COURSES_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

export default function InputField({
  branchesModalData,
  inputName,
}) {

  const dispatch = useDispatch();
  const labelArr = [
    { name: "name", label: "Filial adı" },
  ];
  const inputValue = branchesModalData[inputName] ||  "";

  const nameOnChange = (e) => {
    dispatch({type: BRANCHES_MODAL_ACTION_TYPE.GET_BRANCH_MODAL, payload:{data: {...branchesModalData, name: e.target.value}, openModal: true} })
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
        onChange={(e) => nameOnChange(e)}
      />
    </>
  );
}
