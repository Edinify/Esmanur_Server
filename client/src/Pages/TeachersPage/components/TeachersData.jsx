import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "./TeacherCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const TeachersData = ({ teacherPageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { teachers, totalPages } = useSelector(
    (state) => state.teachersPagination
  );
  const { loading } = useSelector((state) => state.teachersPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Fənn" },
    { id: 3, label: "Email" },
    { id: 4, label: "Telefon nömrəsi" },
    { id: 5, label: "Əmək haqqı" },
    { id: 6, label: "" },
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
            <MoreModal setOpenMoreModal={setOpenMoreModal} type="teacher" />
          )}
          <table className="details-table teacher-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {teachers?.map((teacher, i) => (
                <TeacherCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1 + (teacherPageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {teachers?.map((teacher, i) => (
              <TeacherCard
                setOpenMoreModal={setOpenMoreModal}
                key={i}
                data={teacher}
                mode="tablet"
                cellNumber={i + 1 + (teacherPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={teacherPageNum}
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

export default TeachersData;
