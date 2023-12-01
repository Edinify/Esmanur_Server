import React from "react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INCOMES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteIncomesAction } from "../../../../../redux/actions/incomeActions";

const IncomesCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
 
  const updateItem = () => {
    const { _id, appointment, amount, date, branch } = data;
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
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
  }
  const deleteItem = () => {
    dispatch(deleteIncomesAction(data._id));
  }
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
                dataType="incomes"
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
                dataType="incomes"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IncomesCard;
