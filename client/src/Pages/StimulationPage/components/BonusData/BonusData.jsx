import { useDispatch, useSelector } from "react-redux";
import BonusCard from "./BonusCard";
import { Pagination } from "antd";
import Loading from "../../../../globalComponents/Loading/Loading";
import { useEffect, useState } from "react";
import { getBonusPaginationAction } from "../../../../redux/actions/bonusActions";
import { clearSearchValue } from "../../../../redux/actions/clearSearchValueAction";
import { BONUS_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

const BonusData = ({ bonusPageNum, getPageNumber, page, dataHead = [] }) => {
  const dispatch = useDispatch();
  const { bonusData, totalPages, loading } = useSelector(
    (state) => state.bonusData
  );
  const { bonusSearchValues } = useSelector((state) => state.searchValues);

  useEffect(() => {
    if (bonusSearchValues) {
      dispatch(getBonusPaginationAction(1, bonusSearchValues, "", ""));
    } else {
      dispatch(getBonusPaginationAction(1, "", "", ""));
    }
    return () => {
      dispatch(clearSearchValue());
    };
  }, [dispatch]);

  //
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table bonus-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bonusData?.map((bonus, i) => (
                <BonusCard
                  key={i}
                  data={bonus}
                  mode="desktop"
                  cellNumber={i + 1 + (bonusPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {bonusData?.map((bonus, i) => (
              <BonusCard
                key={i}
                data={bonus}
                mode="tablet"
                cellNumber={i + 1 + (bonusPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={bonusPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BonusData;
