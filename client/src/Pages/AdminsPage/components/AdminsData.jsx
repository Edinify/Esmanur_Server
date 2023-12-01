import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminCard from "./AdminCard";
import Loading from "../../../globalComponents/Loading/Loading";

const AdminsData = ( ) => {
  const dispatch = useDispatch();
  const { admins, totalPages,loading } = useSelector((state) => state.adminsPagination);
  const tableHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 3, label: "Email" },
    { id: 4, label: "Filial" },
    { id: 7, label: "", type: 'more-options-head' },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table admin-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {admins?.map((teacher, i) => (
                <AdminCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {admins?.map((teacher, i) => (
              <AdminCard
                key={i}
                data={teacher}
                mode="tablet"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminsData;
