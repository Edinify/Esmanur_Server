import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BonusData from "../BonusData/BonusData";
import FineData from "../FineData/FineData";

const StimulationData = ({getPageNumberBonus, getPageNumberFine, finePageNum, bonusPageNum}) => {
  const location = useLocation();
  const bonusHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Rəy" },
    { id: 3, label: "Bonus" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];
  const fineHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Cərimə növü" },
    { id: 3, label: "Rəy" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];


  return (
    <div>
      {location.pathname === "/stimulations/bonus" ? (
        <BonusData
          bonusPageNum={bonusPageNum}
          getPageNumber={getPageNumberBonus}
          page={"stimulations"}
          dataHead={bonusHead}
        />
      ) : (
        <FineData
          finePageNum={finePageNum}
          getPageNumber={getPageNumberFine}
          page={"stimulations"}
          dataHead={fineHead}
        />
      )}
    </div>
  );
};

export default StimulationData;
