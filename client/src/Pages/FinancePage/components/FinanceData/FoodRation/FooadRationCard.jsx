import { useState, React } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FOOD_RATION_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteFoodRationAction } from "../../../../../redux/actions/foodRationAction";

const FoodRationCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const updateItem = () => {
    const { _id, name, unitAmount, amount, quantity, date, branch } = data;
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.GET_FOOD_RATION_MODAL,
      payload: {
        data: {
          _id,
          name,
          unitAmount,
          amount,
          quantity,
          date,
          branch,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteFoodRationAction(data._id));
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>{data.quantity}</td>
          <td>{data.unitAmount}</td>
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
                <span className="type">Qidanın adı:</span>
                <p>{data.name ? data.name : "boş"}</p>
              </li>
              <li>
                <span className="type">Miqdarı:</span>
                <p>{data.quantity ? data.quantity : "boş"}</p>
              </li>
              <li>
                <span className="type">Vahidin məbləği:</span>
                <p>{data.unitAmount ? data.unitAmount : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Ümumi məbləğ:</span>
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
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FoodRationCard;
