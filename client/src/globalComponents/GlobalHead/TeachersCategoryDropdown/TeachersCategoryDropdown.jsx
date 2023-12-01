import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg"
import {
  TEACHERS_CATEGORY_ACTION_TYPE,
} from "../../../redux/actions-type";

export const TeachersCategoryDropdown = ({ statusType, deviceType = '' }) => {
  const { category } = useSelector((state) => state.teachersCategory);

  const dispatch = useDispatch();
  const categoryFilter = [
    { key: "all", name: "Bütün müəllimlər" },
    { key: "kindergartenTeachers", name: "Bağça müəllimləri" },
    { key: "babysitters", name: "Dayələr" },
    { key: "courseTeachers", name: "Fənn müəllimləri" },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const getCategory = (categoryType) => {
    setSelectedType(categoryType.name);
    setDropdownOpen(false);
      dispatch({
        type: TEACHERS_CATEGORY_ACTION_TYPE.GET_TEACHERS_CATEGORY,
        payload: categoryType.key,
      });
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
        <h2>{selectedType ? selectedType : "Bütün müəllimlər"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
          <ul>
            {categoryFilter.map((item) => (
              <li key={item.key} onClick={() => getCategory(item)}>
                {category === item.id && <CheckIcon />}
                {item.name}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};
