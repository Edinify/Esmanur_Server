import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";

const CoursesList = ({
  className,
  i,
  deleteClass,
  addAmount,
  setInputValue,
  formik,
  studentsModalData,
}) => {
  return (
    <li key={i}>
      <div className="top">
        {className?.course?.name ? `${i + 1}. ${className.course.name}` : null}
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" onClick={() => deleteClass(i)} />
        </div>
      </div>

      <div className="input-box">
        <TextField
          sx={{
            "& input": { fontSize: "12px", marginRight: "32px" },
            marginTop: "16px",
          }}
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: className.lessonAmount ? true : false,
          }}
          fullWidth
          label="Fənin sayı"
          name="lessonAmount"
          autoComplete="off"
          type="number"
          value={className.lessonAmount ? className.lessonAmount : ""}
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            addAmount(i, e.target.value);
          }}
          onBlur={(e) => {
            formik.setFieldTouched("lessonAmount", true);
          }}
        />
      </div>
    </li>
  );
};

export default CoursesList;
