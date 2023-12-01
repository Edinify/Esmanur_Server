import { useState, React } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { EXPENSES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { deleteExpensesAction } from "../../../../../redux/actions/expensesAction";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const ExpensesCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const updateItem = () => {
    const { _id, appointment, amount, date, branch } = data;
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: {
        data: {
          _id,
          appointment,
          amount,
          date,
          branch,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteExpensesAction(data._id));
  };
  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.appointment}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>{data.amount}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.date ? moment(data.date).format("DD-MM-YYYY") : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          {user.role === "super-admin" && (
            <td className="more-options">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                dataType="expenses"
              />
            </td>
          )}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span className="type">Təyinat:</span>
                <p>{data.appointment ? data.appointment : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Məbləği:</span>
                <p>{data.amount ? data.amount : "boş"}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.date ? moment(data.date).format("YYYY-MM-DD") : "boş"}
                </p>
              </li>
            </ul>
          </div>
          {user.role === "super-admin" && (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                dataType="expenses"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExpensesCard;
