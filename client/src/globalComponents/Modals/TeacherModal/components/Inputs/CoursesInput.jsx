import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/Checkbox.svg";
import { allCoursesAction } from "../../../../../redux/actions/coursesActions";

const CoursesInput = ({
  formik,
  changeIcon,
  classIcon,
  checkedList,
  selectedClassList,
  setSelectedClassList,
  setInputValue,
  updateModalState,
  setClassIcon,
}) => {
  const dispatch = useDispatch();
  const { allCourses } = useSelector((state) => state.allCourses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classErrMessage, setClassErrMessage] = useState(false);
  const [searchedValue, setSearcherValue] = useState("");

  const newaddClass = () => {
    setInputValue("course", "var");

    if (selectedClassList.length > 0) {
      const coursesList = selectedClassList.map((course) => {
        return course._id;
      });
      if (coursesList.indexOf(selectedClass._id) > -1) {
        setClassErrMessage(true);
        changeIcon();
      } else {
        setSelectedClassList([
          ...selectedClassList,
          {
            name: selectedClass.name,
            _id: selectedClass._id,
          },
        ]);
        setSelectedClass("");
        setClassErrMessage(false);
        changeIcon();
        updateModalState("courses", [...selectedClassList]);
      }
    } else {
      setSelectedClassList([
        ...selectedClassList,
        {
          name: selectedClass.name,
          _id: selectedClass._id,
        },
      ]);
      setSelectedClass("");
      setClassErrMessage(false);
      changeIcon();
      updateModalState("courses", [...selectedClassList]);
    }
    setSearcherValue("");
  };
  const deleteClass = (index) => {
    if (selectedClassList.length === 1) {
      setInputValue("course", "");
      changeIcon();
      updateModalState("courses", []);
      setSelectedClassList([]);
    } else {
      const updatedClasses = [...selectedClassList];
      updatedClasses.splice(index, 1);
      setSelectedClassList(updatedClasses);
    }
  };

  useEffect(() => {
    dispatch(allCoursesAction());
  }, []);

  const searchData = (e) => {
    setSearcherValue(e.target.value);
    setSelectedClass(null);
    setClassIcon(true);
  };

  return (
    <div>
      <div className="class-input">
        <div className="class-field courses">
          <div className="left">
            <div className="input-box">
              <TextField
                sx={{
                  "& input": {
                    fontSize: "12px",
                  },
                  marginTop: "24px",
                }}
                InputLabelProps={{
                  style: { fontSize: "12px", color: "#3F3F3F" },
                }}
                fullWidth
                label="Fənn"
                id="class"
                name="course"
                autoComplete="off"
                value={selectedClass ? selectedClass.name : searchedValue}
                onBlur={() => formik.setFieldTouched("course", true)}
                onClick={changeIcon}
                onChange={(e) => searchData(e)}
              />
              <div className="dropdown-icon" onClick={changeIcon}>
                <svg
                  className={!classIcon ? "down" : "up"}
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
              className={`create-update-modal-dropdown ${
                classIcon ? "active" : ""
              }`}
            >
              {allCourses
                .filter((item) =>
                  item.name.toLowerCase().includes(searchedValue.toLowerCase())
                )
                .map((item) => (
                  // item.status && (
                  <li key={item._id} onClick={() => setSelectedClass(item)}>
                    {checkedList.indexOf(item._id) > -1 ? <CheckIcon /> : null}
                    <h4 key={item._id}>{item.name}</h4>
                  </li>
                ))}
            </ul>
          </div>

          <div className="right">
            <button
              disabled={!selectedClass}
              onClick={newaddClass}
              className="add-class"
            >
              {/* Əlavə et  */}
              <AiOutlinePlusCircle />
            </button>
          </div>
        </div>

        {Array.isArray(selectedClassList) && selectedClassList.length > 0 && (
          <ul className="category-list">
            {classErrMessage ? (
              <small className="category-error-message">
                Fənn artıq mövcuddur.
              </small>
            ) : null}
            {selectedClassList.map((className, i) => (
              <li key={i}>
                {i + 1}. {className?.name}
                <div className="minus-icon-con">
                  <MinusIcon
                    className="minus-icon"
                    onClick={() => deleteClass(i)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">{formik.errors.course}</small>
      )}
    </div>
  );
};

export default CoursesInput;
