import React from "react";

export default function Status({coursesModalData, updateModalState }) {

  const getStatus = (status) => {
    updateModalState("status", status)
  };
  return (
    <ul className="modal-status">
      <li
        className={`${coursesModalData.status ? "active" : ""}`}
        onClick={() => getStatus(true)}
      >
        Aktiv
      </li>
      <li
        className={`${coursesModalData.status ? "" : "active"}`}
        onClick={() => getStatus(false)}
      >
        Deaktiv
      </li>
    </ul>
  );
}
