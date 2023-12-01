import React, { useEffect, useState } from "react";
import SalaryMoreModal from "../../../../globalComponents/MoreModal/components/SalaryMoreModal/SalaryMoreModal";
import SalaryBonusModal from "../SalaryBonusModal/SalaryBonusModal";
import SalaryEditModal from "../SalaryBonusModal/components/SalaryEditModal/SalaryEditModal";

const SalaryCard = ({ salary, mode, cellNumber }) => {
  const [bonusEditModal, setBonusEditModal] = useState(false);
  const [salaryMoreModal, setSalaryMoreModal] = useState(false);
  const [openBonusModal, setOpenBonusModal] = useState(false);

  useEffect(() => {
    if (salaryMoreModal) {
      document.body.style.overflowY = "hidden";
    } else if (openBonusModal && window.innerWidth <= 1280) {
      document.body.style.overflowY = "hidden";
    } else if (bonusEditModal && window.innerWidth <= 1280) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [salaryMoreModal, openBonusModal, bonusEditModal]);

  return (
    <>
      {mode === "desktop" ? (
        <>
          <tr>
            <td>
              <div className="td-con">
                <div className="cell-number">{cellNumber}.</div>
                <div className="table-scroll-text">{salary.teacherName}</div>
                <div className="right-fade"></div>
              </div>
            </td>
            <td>{salary.confirmedCount}</td>
            <td>{salary.cancelledCount}</td>
            <td>{salary.participantCount}</td>
            <td>
              {salary.salary?.value}{" "}
              {salary.salary.hourly === true ? "(saatlıq)" : "(aylıq)"}{" "}
            </td>
            <td>{salary.totalSalary}</td>
            <td>
              {salary.bonus ? salary.bonus : "0"}{" "}
              <SalaryEditModal
                salary={salary}
                setBonusEditModal={setBonusEditModal}
                bonusEditModal={bonusEditModal}
                setOpenBonusModal={setOpenBonusModal}
              />
            </td>
            <td>
              {
                <SalaryBonusModal
                  salary={salary}
                  setOpenBonusModal={setOpenBonusModal}
                  openBonusModal={openBonusModal}
                  setBonusEditModal={setBonusEditModal}
                />
              }
            </td>
          </tr>
        </>
      ) : (
        <>
          {salaryMoreModal && (
            <SalaryMoreModal
              setSalaryMoreModal={setSalaryMoreModal}
              setBonusEditModal={setBonusEditModal}
              salary={salary}
              setOpenBonusModal={setOpenBonusModal}
            />
          )}
          <div className="content-box">
            <div className="left">
              <h3>{salary.teacherName}</h3>
              <ul>
                <li>
                  <span className="type">Əmək haqqı:</span>
                  {salary.salary?.value}{" "}
                  {salary.salary.hourly === true ? "(saatlıq)" : "(aylıq)"}{" "}
                </li>
                <li>
                  <span className="type">Toplam əmək haqqı:</span>
                  {salary.totalSalary}
                </li>
              </ul>
            </div>
            <div className="right">
              <div
                onClick={() => setSalaryMoreModal(true)}
                className="salary-tablet-modal"
              >
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
              </div>
            </div>
            {openBonusModal && (
              <div className="salary-bonus-modal-tablet">
                <SalaryBonusModal
                  salary={salary}
                  setOpenBonusModal={setOpenBonusModal}
                  openBonusModal={openBonusModal}
                />
              </div>
            )}

            {bonusEditModal && (
              <div className="salary-bonus-modal-tablet">
                <SalaryEditModal
                  salary={salary}
                  setBonusEditModal={setBonusEditModal}
                  bonusEditModal={bonusEditModal}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SalaryCard;
