import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalaryCard from "./SalaryCard";
import { Pagination } from "antd";
import Loading from "../../../../globalComponents/Loading/Loading";

const SalaryData = ({ salaryPageNum, getPageNumber }) => {
  const { salariesData, totalPage, loading } = useSelector(
    (state) => state.salaryPagination
  );
  const [bonusEditModal, setBonusEditModal] = useState(false);
  const [bonusModal, setBonusModal] = useState(false);

  const salaryTableHead = [
    { id: 1, head: "Müəllim adı" },
    { id: 2, head: "Təsdiqləndi" },
    { id: 3, head: "İmtina edildi" },
    { id: 4, head: "İştirakçı sayı" },
    { id: 5, head: "Əmək haqqı" },
    { id: 6, head: "Toplam əmək haqqı" },
    { id: 7, head: "Bonus" },
    { id: 8, head: "", type: "more-options-head" },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table salary-table">
            <thead>
              <tr>
                {salaryTableHead.map((salaryHead) => (
                  <th key={salaryHead.id} className={salaryHead.type ? salaryHead.type : ''}>{salaryHead.head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {salariesData?.map((salary, i) => (
                <SalaryCard
                  key={i}
                  salary={salary}
                  mode="desktop"
                  cellNumber={i + 1 + (salaryPageNum - 1) * 10}
                  bonusModal={bonusModal}
                  setBonusEditModal={setBonusEditModal}
                  setBonusModal={setBonusModal}
                  bonusEditModal={bonusEditModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {salariesData.map((salary, index) => (
              <SalaryCard
                key={index}
                salary={salary}
                mode="tablet"
                cellNumber={index + 1 + (salaryPageNum - 1) * 10}
                bonusModal={bonusModal}
                setBonusEditModal={setBonusEditModal}
                setBonusModal={setBonusModal}
                bonusEditModal={bonusEditModal}
              />
            ))}
          </div>

          {totalPage > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={salaryPageNum}
                defaultCurrent={1}
                total={totalPage * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SalaryData;
