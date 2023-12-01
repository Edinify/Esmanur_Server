import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/Checkbox.svg";

const TeacherLists = ({
  selectedTeacherName,
  setSelectedTeacherName,
  teacherNameDropdown,
  teacherNameOpen,
  setTeacherNameOpen,
  teacherNameAddData,
  teacherList,
  funcType,
}) => {
  const [searchedValue, setSearcherValue] = useState("");
  const { dropdownName } = useSelector((state) => state.dropdownName);

  const searchData = (e) => {
    setSearcherValue(e.target.value);
    setSelectedTeacherName("");
    setTeacherNameOpen(true);
  };

  const changeOpenDropdown = () => {
    if (!selectedTeacherName && dropdownName) {
      setSearcherValue(dropdownName.fullName);
    }
    setTeacherNameOpen(!teacherNameOpen);
  };

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
            label="Müəllim adı"
            name="class"
            autoComplete="off"
            value={
              selectedTeacherName ? selectedTeacherName.fullName : searchedValue
            }
            onClick={teacherNameDropdown}
            onChange={(e) => searchData(e)}
            disabled={funcType === "update"}
          />
          <div className="dropdown-icon" onClick={teacherNameDropdown}>
            {funcType === "update" ? (
              ""
            ) : (
              <div onClick={changeOpenDropdown}>
                <svg
                  className={!teacherNameOpen ? "down" : "up"}
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
            )}
          </div>
        </div>

        <ul
          className={`create-update-modal-dropdown where-coming ${
            teacherNameOpen ? "active" : ""
          }`}
        >
          {teacherList
            ?.filter((item) =>
              item.fullName.toLowerCase().includes(searchedValue.toLowerCase())
            )
            .map((item, i) => {
              const { fullName, _id } = item;
              return (
                <li key={i} onClick={() => teacherNameAddData(item)}>
                  {/* {dropdownName && dropdownName._id === _id && <CheckIcon />} */}
                  <h4>{fullName}</h4>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default TeacherLists;
