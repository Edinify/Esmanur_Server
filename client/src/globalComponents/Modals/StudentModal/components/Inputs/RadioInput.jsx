import React from 'react'

export default function RadioInput({studentsModalData, setInputValue, formik, updateModalState}) {
  const changeSector = (e, value) => {
        updateModalState("sector", 
        {
          az: value === 'AZ' ? e.target.checked : studentsModalData?.sector?.az !== undefined ? studentsModalData?.sector?.az : false ,
          en: value === 'EN' ? e.target.checked : studentsModalData?.sector?.en !== undefined ? studentsModalData?.sector?.en : false,
          ru: value === 'RU' ? e.target.checked : studentsModalData?.sector?.ru !== undefined ? studentsModalData?.sector?.ru : false,
        } )
      setInputValue("sector", true)
  }

  return (
    <div>      
    <label className="radio-sector-title">Bölmə</label>
    <div className="radio-sector-con department">
        <label>
        <input type="checkbox" name="sector"  
          checked={studentsModalData?.sector?.az !== undefined ? studentsModalData?.sector?.az : false}
          onChange={(e) => changeSector(e, "AZ")}
        />
        AZ
        </label>

        <label>
        <input type="checkbox" name="language" 
          checked={studentsModalData?.sector?.en !== undefined ? studentsModalData?.sector?.en : false}
          onChange={(e) => changeSector(e, "EN")}
        />
        RU
        </label>

        <label>
        <input type="checkbox" name="language" 
          checked={studentsModalData?.sector?.ru !== undefined ? studentsModalData?.sector?.ru : false}
          onChange={(e) => changeSector(e, "RU")}
        />
        EN
        </label>
    </div>
    {formik.errors.sector &&  <small className="validation-err-message sector">{formik.errors.sector}</small>}
    </div>
  )
}
