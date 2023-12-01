import React from "react";

const SectorRadio = ({
  formik,
  teachersModalData,
  updateModalState,
  setInputValue,
}) => {
  const changeSector = (e, value) => {
    updateModalState("sector", {
      az:
        value === "AZ"
          ? e.target.checked
          : teachersModalData?.sector?.az !== undefined
          ? teachersModalData?.sector?.az
          : false,
      en:
        value === "EN"
          ? e.target.checked
          : teachersModalData?.sector?.en !== undefined
          ? teachersModalData?.sector?.en
          : false,
      ru:
        value === "RU"
          ? e.target.checked
          : teachersModalData?.sector?.ru !== undefined
          ? teachersModalData?.sector?.ru
          : false,
    });
    setInputValue("sector", true);
  };
  return (
    <div>
      <label className="radio-sector-title">Bölmə</label>
      <div className="radio-sector-con department">
        <label>
          <input
            type="checkbox"
            name="language"
            checked={
              teachersModalData?.sector?.az !== undefined
                ? teachersModalData?.sector?.az
                : false
            }
            onChange={(e) => changeSector(e, "AZ")}
          />
          AZ
        </label>

        <label>
          <input
            type="checkbox"
            name="language"
            checked={
              teachersModalData?.sector?.en !== undefined
                ? teachersModalData?.sector?.en
                : false
            }
            onChange={(e) => changeSector(e, "EN")}
          />
          EN
        </label>

        <label>
          <input
            type="checkbox"
            name="language"
            checked={
              teachersModalData?.sector?.ru !== undefined
                ? teachersModalData?.sector?.ru
                : false
            }
            onChange={(e) => changeSector(e, "RU")}
          />
          RU
        </label>
      </div>
      {formik.errors.sector && (
        <small className="validation-err-message sector">
          {formik.errors.sector}
        </small>
      )}
    </div>
  );
};

export default SectorRadio;
