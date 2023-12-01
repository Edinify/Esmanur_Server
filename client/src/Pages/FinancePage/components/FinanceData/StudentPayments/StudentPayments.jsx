import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentPaymentsCard from "./StudentPaymentsCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";

const StudentPayments = ({ getPageNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {studentPaymentsData,
    totalPages,
    loading,
    lastPage: studentPaymentsPageNum,
  } = useSelector((state) => state.studentPaymentsData);
  const studentPaymentsHead =
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


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table expenses-table">
            <thead>
              <tr>
                {studentPaymentsHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentPaymentsData?.map((expense, i) => (
                <StudentPaymentsCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1 + (studentPaymentsPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page ">
            {studentPaymentsData?.map((expense, i) => (
              <StudentPaymentsCard
                key={i}
                data={expense}
                mode="tablet"
                cellNumber={i + 1 + (studentPaymentsPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={studentPaymentsPageNum}
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

export default StudentPayments;
