import React from "react";

const ApplyClearBtns = ({ clearAll, applyFilter }) => {
  return (
    <div className="buttons-con">
      <button className="clear-btn" onClick={clearAll}>
        Hamısını sil
      </button>
      <button className="apply-btn" onClick={applyFilter}>
        Tətbiq et
      </button>
    </div>
  );
};

export default ApplyClearBtns;
