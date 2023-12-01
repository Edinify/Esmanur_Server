import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg"
import {
  STUDENT_STATUS_FILTER_ACTION_TYPE,
  TEACHER_STATUS_FILTER_ACTION_TYPE,
} from "../../../redux/actions-type";

export const StatusDropdown = ({ statusType, deviceType = '' }) => {
  const { teacherStatus } = useSelector((state) => state.teacherStatus);
  const { studentStatus } = useSelector((state) => state.studentStatus);

  const dispatch = useDispatch();
  const StatusFilter = [
    { key: "all", name: "Bütün statuslar" },
    { key: "active", name: "Aktiv" },
    { key: "deactive", name: "Deaktiv" },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const getCategory = (categoryType) => {
    setSelectedType(categoryType.name);
    setDropdownOpen(false);
    if (statusType === "teachers") {
      dispatch({
        type: TEACHER_STATUS_FILTER_ACTION_TYPE.GET_TEACHER_STATUS,
        payload: categoryType.key,
      });
    } else {
      dispatch({
        type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS,
        payload: categoryType.key,
      });
    }
  };

  useEffect(() => {
    setSelectedType("");
  }, []);

  return (
    <div className={`global-category-dropdown dropdown-name data-status ${deviceType} ${dropdownOpen ? "active" : ""}`}>
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>{selectedType ? selectedType : "Bütün Statuslar"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {statusType === "teachers" ? (
          <ul>
            {StatusFilter.map((item) => (
              <li key={item.key} onClick={() => getCategory(item)}>
                {teacherStatus === item.id && <CheckIcon />}
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {StatusFilter.map((item) => (
              <li key={item.key} onClick={() => getCategory(item)}>
                {studentStatus === item.id && <CheckIcon />}
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
