import { useState, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteCoursesAction } from "../../../redux/actions/coursesActions";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const CourseCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const updateItem = () => {
    const { name, _id, status } = data;
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: { name, _id, status }, openModal: true },
    });
  };
  const deleteItem = () => {
    dispatch(deleteCoursesAction(data._id));
  };
  return (
    <>
      {mode === "desktop" ? (
        <tr className="class-table">
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          {user.role === "super-admin" ? (
            <td className="more-options">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
              />
            </td>
          ) : null}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3 className="name">{data.name}</h3>
          </div>

          {user.role === "super-admin" ? (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CourseCard;
