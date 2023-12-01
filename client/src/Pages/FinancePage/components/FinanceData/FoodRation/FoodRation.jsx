import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodRationCard from "./FooadRationCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getFoodRationPaginationAction } from "../../../../../redux/actions/foodRationAction";

const FoodRationData = ({  getPageNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const foodRationData = useSelector((state) => state?.foodRationData.foodRationData);
  const { totalPages, loading, lastPage: foodRationPageNum } = useSelector((state) => state.foodRationData);
  const foodRationHead = user.role === "super-admin" ? [
    { id: 1, label: "Qidanın adı" },
    { id: 2, label: "Miqdarı" },
    { id: 3, label: "Vahidin məbləği" },
    { id: 3, label: "Ümumi məbləğ" },
    { id: 3, label: "Tarix" },
   { id: 4, label: "", type: 'more-options-head'},
  ] :
  [
    { id: 1, label: "Qidanın adı" },
    { id: 2, label: "Miqdarı" },
    { id: 3, label: "Vahidin məbləği" },
    { id: 3, label: "Ümumi məbləğ" },
    { id: 3, label: "Tarix" },
  ]


// useEffect(() => {
//   dispatch(getFoodRationPaginationAction(1, "", "", 1));
// }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table expenses-table">
            <thead>
              <tr>
                {foodRationHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {foodRationData?.map((expense, i) => (
                <FoodRationCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1 + (foodRationPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page ">
          {foodRationData?.map((expense, i) => (
            <FoodRationCard
              key={i}
              data={expense}
              mode="tablet"
              cellNumber={i + 1 + (foodRationPageNum - 1) * 10}
            />
          ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={foodRationPageNum}
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

export default FoodRationData;
