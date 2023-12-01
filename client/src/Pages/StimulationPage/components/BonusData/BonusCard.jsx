import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { BONUS_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";
import MoreModal from "../../../../globalComponents/MoreModal/MoreModal";
import UpdateDeleteModal from "../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deletetBonusAction } from "../../../../redux/actions/bonusActions";

const BonusCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const [openMoreModal, setOpenMoreModal] = useState(false);

  const updateItem = (modalType) => {
    const { teacher, comment, _id, amount } = data;
    dispatch({
      type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
      payload: {
        data: {
          teacher: teacher._id,
          comment,
          amount,
          _id,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deletetBonusAction(data._id));
  };
  const openMoreModalFunc = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.teacher?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.comment}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>{data.amount}</td>
          <td className="date">
            {data.createdAt ? moment(data.createdAt).format("DD-MM-YYYY") : ""}
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
            <h3>{data?.teacher?.fullName}</h3>
            <ul>
              <li>
                <span className="type">Bonus:</span>
                <p>{data.amount ? data.amount : "boş"}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.createdAt
                    ? moment(data.createdAt).format("YYYY-MM-DD")
                    : "boş"}
                </p>
              </li>
              <li>
                <span className="type">Rəy:</span>
                <p>{data.comment ? data.comment : "boş"} </p>
              </li>
            </ul>
          </div>
          <div className="right">
            <span onClick={() => openMoreModalFunc()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icons/Line/Arrows/chevron-right">
                  <path
                    id="Icon"
                    d="M9 18L15 12L9 6"
                    stroke="#717171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </span>

            {openMoreModal && (
              <MoreModal
                setOpenMoreModal={setOpenMoreModal}
                type="bonus"
                data={data}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BonusCard;
