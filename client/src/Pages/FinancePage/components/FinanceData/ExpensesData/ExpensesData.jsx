import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesCard from "./ExpensesCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getExpensesPaginationAction } from "../../../../../redux/actions/expensesAction";

const ExpensesData = ({ getPageNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const expensesData = useSelector((state) => state?.expensesData.expensesData);
  const {
    totalPages,
    loading,
    lastPage: expensesPageNum,
  } = useSelector((state) => state.expensesData);
  const expensesHead =
    user.role === "super-admin"
      ? [
          { id: 1, label: "Təyinat" },
          { id: 2, label: "Məbləğ" },
          { id: 3, label: "Tarix" },
          { id: 4, label: "", type: 'more-options-head' },
        ]
      : [
          { id: 1, label: "Təyinat" },
          { id: 2, label: "Məbləğ" },
          { id: 3, label: "Tarix" },
        ];

  // useEffect(() => {
  //   dispatch(getExpensesPaginationAction(1, "", "", 1));
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
                {expensesHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expensesData?.map((expense, i) => (
                <ExpensesCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1 + (expensesPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page ">
            {expensesData?.map((expense, i) => (
              <ExpensesCard
                key={i}
                data={expense}
                mode="tablet"
                cellNumber={i + 1 + (expensesPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={expensesPageNum}
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

export default ExpensesData;
