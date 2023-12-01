import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";

const CoursesData = ({ coursePageNum, getPageNumber }) => {
  const { courses, totalPages } = useSelector((state) => state.coursesPagination);
  const { loading } = useSelector((state) => state.coursesPagination);
  const tableHead = [
    { id: 1, label: "Fənn adı" },
    { id: 3, label: "", type: 'more-options-head' },
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table courses-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ''}>{head.label}</th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {courses.map((courseName, i) => (
                <CourseCard
                  key={i}
                  data={courseName}
                  mode="desktop"
                  cellNumber={i + 1 + (coursePageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet course-list-mobile">
            <h3 className="details-list-title">Fənn adı</h3>
            {courses.map((courseName, i) => (
              <CourseCard
                key={i}
                data={courseName}
                mode="mobile"
                cellNumber={i + 1 + (coursePageNum - 1) * 10}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={coursePageNum}
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

export default CoursesData;
