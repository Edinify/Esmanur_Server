import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UniformCard from "./UniformCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getUniformsPaginationAction } from "../../../../../redux/actions/uniformsAction";

const UniformsData = ({  getPageNumber}) => {
  const dispatch = useDispatch();
  const uniformsData = useSelector((state) => state?.uniformsData.uniformsData);
  const { totalPages, loading, lastPage: uniformsPageNum } = useSelector((state) => state.uniformsData);
  const uniformsHead = [
    { id: 1, label: "Uşağın adı" },
    { id: 2, label: "Formaların sayı" },
    { id: 3, label: "Alış qiyməti" },
    { id: 4, label: "Satış qiyməti" },
    { id: 5, label: "Uşağın ödənişi" },
    { id: 6, label: "Tarix" },
    { id: 7, label: "", type: 'more-options-head' },
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table expenses-table">
            <thead>
              <tr>
                {uniformsHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniformsData?.map((expense, i) => (
                <UniformCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1 + (uniformsPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page ">
          {uniformsData?.map((expense, i) => (
            <UniformCard
              key={i}
              data={expense}
              mode="tablet"
              cellNumber={i + 1 + (uniformsPageNum - 1) * 10}
            />
          ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={uniformsPageNum}
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

export default UniformsData;
