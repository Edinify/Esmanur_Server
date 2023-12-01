import { ReactComponent as CloseIcon } from "../../../../assets/icons/more-modal/x-close.svg";

const SalaryMoreModal = ({
  setSalaryMoreModal,
  salary,
  setBonusEditModal,
  setOpenBonusModal,
}) => {
  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          <h2>{salary.teacherName}</h2>
          <div className="more-modal-header-icons">
            <div className="header-icon-close">
              <CloseIcon onClick={() => setSalaryMoreModal(false)} />
            </div>
          </div>
        </div>
        <div className="more-modal-header-inform">
          <h3>
            Təsdiqləndi: <span>{salary.confirmedCount}</span>
          </h3>
          <h3>
            İmtina edildi: <span>{salary.cancelledCount}</span>
          </h3>
          <h3>
            İştirakçı sayı:<span>{salary.participantCount}</span>
          </h3>
          <h3>
            Əmək haqqı:
            <span>{salary.salary?.value ? salary.salary.value : "0"}</span>
          </h3>
          <h3>
            Toplam əmək haqqı:<span>{salary.totalSalary}</span>
          </h3>
          <h3>
            Bonus:<span>{salary.bonus ? salary.bonus : "0"}</span>
          </h3>
        </div>
        <div className="salary-more-modal-buttons">
          <button
            onClick={() => {
              setSalaryMoreModal(false);
              setBonusEditModal(true);
            }}
            className="edit-bonus-btn"
          >
            Bonus yenilə
          </button>
          <button
            onClick={() => {
              setSalaryMoreModal(false);
              setOpenBonusModal(true);
            }}
            className="add-bonus-btn"
          >
            Bonus əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryMoreModal;
