import React, { useEffect, useRef, useState } from "react";
import "./updateDeleteModal.css"
import { useDispatch, useSelector } from "react-redux";
import { FUNC_COMPONENT_ACTION_TYPE } from "../../../redux/actions-type";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more.svg";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
const UpdateDeleteModal = ({
  updateItem = () => {},
  deleteItem = () => {},
  data,
  dataType = "",
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { funcComp } = useSelector((state) => state.funcComponent);
  const modalRef = useRef(null);

  const handleClickOutside = () => {
    dispatch({
      type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
      payload: false,
    });
  };

  const handleToggleModal = (e) => {
    e.stopPropagation();
    if (funcComp === data._id) {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: false,
      });
    } else {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: data._id,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="func-component">
      <MoreIcon className="more-icon" onMouseDown={handleToggleModal} />
      <div
        className={`delete-update-modal ${
          funcComp === data._id ? "active" : ""
        }`}
        ref={modalRef}
      >
        <>
          <h4
            onClick={() => updateItem()}
            className={dataType === "branches" ? "only" : ""}
          >
            Yenilə
          </h4>
          {dataType !== "branches" ? (
            <h4
              className="delete-func"
              onClick={() => setShowDeleteModal(true)}
            >
              Sil
            </h4>
          ) : (
            ""
          )}
        </>
      </div>
      {showDeleteModal && (
        <DeleteItemModal setShowDeleteModal={setShowDeleteModal} deleteItem={deleteItem} />
      )}
    </div>
  );
};

export default UpdateDeleteModal;
