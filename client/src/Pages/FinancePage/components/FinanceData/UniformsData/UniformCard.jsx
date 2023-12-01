import { useState, React } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { UNIFORMS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { deleteUniformAction } from "../../../../../redux/actions/uniformsAction";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const UniformCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();

  const updateItem = () => {
    const {
      _id,
      childName,
      count,
      outPrice,
      inPrice,
      childPrice,
      date,
      branch,
    } = data;
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL,
      payload: {
        data: {
          _id,
          childName,
          count,
          outPrice,
          inPrice,
          childPrice,
          date,
          branch,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteUniformAction(data._id));
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.childName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>{data.count}</td>
          <td>{data.inPrice}</td>
          <td>{data.outPrice}</td>
          <td>{data.childPrice}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.date ? moment(data.date).format("DD-MM-YYYY") : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="more-options">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            {/* <h3>{data.fullName}</h3> */}
            <ul>
              <li>
                <span className="type">Uşağın adı:</span>
                <p>{data.childName ? data.childName : "boş"}</p>
              </li>
              <li>
                <span className="type">Formaların sayı:</span>
                <p>{data.count ? data.count : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Alış qiyməti:</span>
                <p>{data.inPrice ? data.inPrice : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Satış qiyməti:</span>
                <p>{data.outPrice ? data.outPrice : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Uşağın ödənişi:</span>
                <p>{data.childPrice ? data.childPrice : "boş"}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.date ? moment(data.date).format("YYYY-MM-DD") : "boş"}
                </p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UniformCard;
