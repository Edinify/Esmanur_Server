import React from 'react'

const Status = ({teachersModalData, updateModalState}) => {
  const getStatus = (status) => {
    updateModalState("status", status)
  };
  return (
    <ul className="modal-status">
              <li
                className={`${teachersModalData.status ? "active" : ""}`}
                onClick={() => getStatus(true)}
              >
                Aktiv
              </li>
              <li
                className={`${teachersModalData.status ? "" : "active"}`}
                onClick={() => getStatus(false)}
              >
                Deaktiv
              </li>
            </ul>
  )
}

export default Status