import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/Plus.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  BONUS_MODAL_ACTION_TYPE,
  FINE_MODAL_ACTION_TYPE,
  STIMULATION_PAGE_TYPE_ACTION_TYPE,
} from "../../../../redux/actions-type";

const StimulationHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedType,setSelectedType] = useState("Bonus")
  const openModal = () => {
    if (location.pathname === "/stimulations/bonus") {
      dispatch({
        type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
        payload: { data: {}, openModal: true },
      });
    } else {
      dispatch({
        type: FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL,
        payload: { data: {}, openModal: true },
      });
    }
  };
  return (
    <div className="stimulation-head">
      <div className="stimulation-head-content ">
        <ul>
          <li>
            <Link
              onClick={() => setSelectedType("Bonus")}
              to="/stimulations/bonus"
              className={`data-type ${
                location.pathname === "/stimulations/bonus" ? "active" : ""
              }`}
            >
              Bonus
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setSelectedType("Cərimə")}
              to="/stimulations/fine"
              className={`data-type ${
                location.pathname === "/stimulations/fine" ? "active" : ""
              }`}
            >
              Cərimə
            </Link>
          </li>
        </ul>
        <div className="add-stimul" onClick={openModal}>
          <PlusIcon />
          <h4>Əlavə et</h4>
        </div>
      </div>
    </div>
  );
};

export default StimulationHeader;
