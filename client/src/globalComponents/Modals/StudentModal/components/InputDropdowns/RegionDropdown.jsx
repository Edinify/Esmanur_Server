import React, { useState } from "react";
import { TextField } from "@mui/material";
import './regionDropdown.css'

const RegionDropdown = ({
  formik,
  selectedWhereFrom,
  WhereFromDropdown,
  whereFromOpen,
  selectedWhereFromList,
  whereFromAddData,
}) => {

  return (
    <>
      <div className="class-input">
        <div className="class-field">
          <TextField
            sx={{
              "& input": {
                fontSize: "12px",
                marginRight: "32px",
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="Yaşayış ünvanı"
            name="class"
            autoComplete="off"
            value={selectedWhereFrom ? `${selectedWhereFrom.mainArea} ${selectedWhereFrom.part}` : ''}
            onBlur={() => formik.setFieldTouched('whereFrom', true)}
            onClick={WhereFromDropdown}
          />
          <div className="dropdown-icon" onClick={WhereFromDropdown}>
            <svg
              className={!whereFromOpen ? "down" : "up"}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                stroke="#5D5D5D"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <ul
          className={`create-update-modal-dropdown where-from ${
            whereFromOpen ? "active" : ""
          }`}
        >
          {selectedWhereFromList.map((item, index) => (
            <li key={index}>
              <div className="region-dropdown-head">
                <h4>{item.mainArea}</h4>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                    stroke="#5D5D5D"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

      
              <ul className="where-form-parts-con">
                {item.parts.map((part, index) => (
                  <li key={index} className="part" onClick={() => whereFromAddData(item.mainArea, part)}>
                      <h4>{part}</h4>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {formik.errors.whereFrom && formik.touched.whereFrom && (
        <small className="validation-err-message">
          {formik.errors.whereFrom}
        </small>
      )}
    </>
  );
};

export default RegionDropdown;
