import React from "react";
import "./datePickerModal.css";
import { ReactComponent as CloseIcon } from "../../../assets/icons/x-close-date-filter.svg";
import { DatePick } from "../../DatePicker/DatePicker";

const DatePickerModal = ({setDatePickModal, applyFilter, clearAll}) => {
  const apply = () => {
    applyFilter()
    setDatePickModal(false)
  }
  const clear = () => {
    clearAll()
    setDatePickModal(false)
  }
  return (
    <div className="datepicker-filter-modal">
      <div className="datepicker-filter-modal-con">
        <div className="head">
          <div className="top">
            <h2>Filter</h2>
            <div className="date-filter-close-icon" onClick={() => setDatePickModal(false)}>
              <CloseIcon />
            </div>
          </div>
          <div className="bottom">
            <DatePick />
          </div>
        </div>

        <div className="buttons-con">
          <button className="apply-btn" onClick={apply}> Tətbiq et</button>
          <button className="clear-btn" onClick={clear}>Hamısını sil</button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
