import React, {useState, useEffect} from 'react'
import {AiOutlinePlusCircle} from "react-icons/ai"
import { ReactComponent as MinusIcon } from "../../../../assets/icons/minus-cirlce.svg";
import InputField from './InputField';

const CategoryInput = ({
    formik,
    setInputValue,
    coursesModalData,
    updateModalState
}) => {

    const [categoryList, setCategoryList] = useState([]);
    const [categoryItem, setCategoryItem] = useState("");
    const [categoryErrMessage, setCategoryErrMessage] = useState(false);

    const newaddClass = () => {
        if (categoryItem.trim() !== "") {
            if (categoryList.indexOf(categoryItem.trim()) === -1) {
            setCategoryList([...categoryList, categoryItem.trim()]);
            setCategoryItem("");
            setCategoryErrMessage(false);
            } else {
            setCategoryErrMessage(true);
            }
        }
    };
    const deleteClass = (index) => {
        if (categoryList.length === 1) {
            updateModalState("category", "")
            setCategoryList("");
        } else {
            const updatedClasses = [...categoryList];
            updatedClasses.splice(index, 1);
            setCategoryList(updatedClasses);
        }
    };

    useEffect(() => {
        if(coursesModalData.category) {
          setCategoryList( coursesModalData.category )
        }
      }, []);
    
    useEffect(() => {
        updateModalState("category", categoryList)
    }, [categoryList])
  return (
    <div>
        <div className="class-input">
            <div className="class-field">
            <InputField
              setInputValue={setInputValue}
              coursesModalData={coursesModalData}
              formik={formik}
              inputName={"category"}
              setCategoryItem={setCategoryItem}
            />
            <button
                disabled={!categoryItem.trim()}
                onClick={newaddClass}
                className="add-class"
            >
                <AiOutlinePlusCircle/>
            </button>
            </div>

            <ul className="category-list">
            {categoryErrMessage ? (
                <small className="category-error-message">
                Səviyyə artıq mövcuddur.
                </small>
            ) : null}
            {Array.isArray(categoryList) &&
                categoryList.map((className, i) => (
                <li key={i}>
                    {i + 1}. {className}
                    <div className="minus-icon-con">
                    <MinusIcon
                        className="minus-icon"
                        onClick={() => deleteClass(i)}
                    />
                    </div>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default CategoryInput