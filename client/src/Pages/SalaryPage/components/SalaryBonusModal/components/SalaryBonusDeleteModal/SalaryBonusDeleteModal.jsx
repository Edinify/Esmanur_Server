import { useDispatch, useSelector } from "react-redux";
import { deletetBonusAction } from "../../../../../../redux/actions/bonusActions";

const SalaryBonusDeleteModal = ({ setDeleteBonus }) => {
  const dispatch = useDispatch()
  const { bonusModalData } = useSelector(
    (state) => state.bonusModal
  );
  
  const deleteBonus = (_id) => {
    dispatch(deletetBonusAction(_id));
  };
  return (
    <div className="delete-modal">
      <div className="delete-container">
        <p>{`Silmək istədiyinizə əminsiniz?`}</p>
        <div className="modal-btn">
          <button className="cancel-btn" onClick={() => setDeleteBonus(false)}>
            Ləğv et
          </button>
          <button className="delete-btn" onClick={()=>deleteBonus(bonusModalData._id)} >Sil</button>
        </div>
      </div>
    </div>
  );
};

export default SalaryBonusDeleteModal;
