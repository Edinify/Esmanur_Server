import React from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-down-16.svg";

const DatePickBtn = ({ setDatePickModal }) => {
  return (
    <button
      className="datepicker-filter-modal-btn"
      onClick={() => setDatePickModal(true)}
    >
      Tarix aralığı
      <ArrowIcon />
    </button>
  );
};

export default DatePickBtn;
