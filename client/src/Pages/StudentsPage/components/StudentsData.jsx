import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const StudentsData = ({ studentPageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { students, totalPages } = useSelector(
    (state) => state.studentsPagination
  );
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.studentsPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead =
    user.role === "super-admin"
      ? [
          { id: 1, label: "Tələbə adı" },
          // { id: 2, label: "Ana adı" },
          // { id: 8, label: "Ata adı" },
          { id: 3, label: "Fənlər" },
          // { id: 4, label: "Ana telefon nömrəsi" },
          // { id: 9, label: "Ata telefon nömrəsi" },
          { id: 7, label: "", type: "more-options-head" },
        ]
      : [
          { id: 1, label: "Tələbə adı" },
          // { id: 2, label: "Ana adı" },
          // { id: 8, label: "Ata adı" },
          { id: 3, label: "Fənlər" },
          // { id: 4, label: "Ana telefon nömrəsi" },
          // { id: 9, label: "Ata telefon nömrəsi" },
          { id: 7, label: "" },
        ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              data={students}
              setOpenMoreModal={setOpenMoreModal}
              type="student"
            />
          )}
          <table className="details-table  student-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ""}>
                    {head.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students?.map((student, i) => (
                <StudentCard
                  key={i}
                  data={student}
                  mode="desktop"
                  setOpenMoreModal={setOpenMoreModal}
                  cellNumber={i + 1 + (studentPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {students?.map((student, i) => (
              <StudentCard
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (studentPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={studentPageNum}
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

export default StudentsData;
