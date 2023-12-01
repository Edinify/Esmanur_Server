import React from 'react'


const Status = ({studentsModalData, updateModalState}) => {
  const getStatus=(status)=>{
    updateModalState("status", status)
  }
  return (
    <ul className="modal-status">
    <li
      className={`${studentsModalData.status ? "active" : ""}`}
      onClick={() =>(getStatus(true))}
    >
      Aktiv
    </li>
    <li
      className={`${studentsModalData.status ? "" : "active"}`}
      onClick={() => (getStatus(false))}
    >
      Deaktiv
    </li>
  </ul>
  )
}

export default Status