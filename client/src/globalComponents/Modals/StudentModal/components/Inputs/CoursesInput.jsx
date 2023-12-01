import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/Checkbox.svg";
import { allCoursesAction } from "../../../../../redux/actions/coursesActions";
import CoursesList from "./CoursesList";

const CoursesInput = ({
  formik,
  changeIcon,
  classIcon,
  setClassIcon,
  checkedList,
  selectedClassList,
  setSelectedClassList,
  setInputValue,
  updateModalState,
  studentsModalData,
}) => {
  const dispatch = useDispatch();
  const { allCourses } = useSelector((state) => state.allCourses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classErrMessage, setClassErrMessage] = useState(false);
  const [searchedValue, setSearcherValue] = useState("");

  const deleteClass = (index) => {
    if (selectedClassList.length === 1) {
      updateModalState("courses", []);
      setSelectedClassList([]);
      setInputValue("lessonAmount", "");
    } else {
      const updatedClasses = [...selectedClassList];
      updatedClasses.splice(index, 1);
      setSelectedClassList(updatedClasses);
      setInputValue(
        "lessonAmount",
        updatedClasses?.find((item) => !item.lessonAmount) ? "" : 1
      );
    }
  };
  const newAddClass = () => {
    setInputValue("lessonAmount", "");

    if (selectedClassList.length > 0) {
      const coursesList = selectedClassList.map((course) => {
        return course.course._id;
      });
      if (coursesList.indexOf(selectedClass._id) > -1) {
        setClassErrMessage(true);
        changeIcon();
      } else {
        setSelectedClassList([
          ...selectedClassList,
          {
            course: selectedClass,
            _id: selectedClass._id,
            lessonAmount: selectedClass?.lessonAmount,
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
          course: selectedClass,
          _id: selectedClass._id,
          lessonAmount: selectedClass?.lessonAmount,
        },
      ]);
      setSelectedClass("");
      setClassErrMessage(false);
      changeIcon();
      updateModalState("courses", [...selectedClassList]);
    }
    setSearcherValue("");
  };
  const addAmount = (i, value) => {
    const updatedClasses = [...selectedClassList];
    updatedClasses[i] = { ...updatedClasses[i], lessonAmount: value };
    setSelectedClassList([...updatedClasses]);
    setInputValue(
      "lessonAmount",
      updatedClasses?.find((item) => !item.lessonAmount) ? "" : 1
    );
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
                  "& input": { fontSize: "12px", marginRight: "32px" },
                  marginTop: "24px",
                }}
                InputLabelProps={{
                  style: { fontSize: "12px", color: "#3F3F3F" },
                }}
                fullWidth
                label="Fənn"
                id="course"
                name="course"
                autoComplete="off"
                value={selectedClass ? selectedClass.name : searchedValue}
                onClick={() => {
                  changeIcon();
                }}
                onChange={(e) => searchData(e)}
              />

              {formik.errors.lessonAmount && formik.touched.lessonAmount && (
                <small className="validation-err-message courses">
                  {formik.errors.lessonAmount}
                </small>
              )}

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
                  <li key={item._id} onClick={() => setSelectedClass(item)}>
                    {checkedList.find(
                      (checkedCourse) => checkedCourse === item._id
                    ) ? (
                      <CheckIcon />
                    ) : null}
                    <h4 key={item._id}>{item.name}</h4>
                  </li>
                ))}
            </ul>
          </div>

          <div className="right">
            <button
              disabled={!selectedClass}
              onClick={newAddClass}
              className="add-class"
            >
              <AiOutlinePlusCircle />
            </button>
          </div>
        </div>
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">{formik.errors.course}</small>
      )}

      <ul className="category-list courses-li">
        {classErrMessage ? (
          <small className="category-error-message">
            Fənn artıq mövcuddur.
          </small>
        ) : null}

        {Array.isArray(selectedClassList) &&
          selectedClassList.map((className, i) => {
            return (
              <CoursesList
                key={i}
                className={className}
                i={i}
                deleteClass={deleteClass}
                addAmount={addAmount}
                setInputValue={setInputValue}
                formik={formik}
                studentsModalData={studentsModalData}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default CoursesInput;
