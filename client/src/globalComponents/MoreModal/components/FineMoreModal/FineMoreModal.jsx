import React from "react";
import moment from "moment";
import "moment/locale/az";

const FineMoreModal = ({data}) => {
  const fineTypeList = [
    { name: "Şifahi xəbərdarlıq", key: "verbalWarning" },
    { name: "Yazılı xəbərdarlıq", key: "writtenWarning" },
    { name: "Töhmət", key: "rebuke" },
    { name: "Şiddətli töhmət", key: "severeRebuke" },
  ];

  return (
    <>
      <div className="more-modal-header-inform">
           <h2>{data?.teacher.fullName}</h2>
        <h3>
          Cərimə növü: <span>{data.fineType
                    ? fineTypeList.find((item) => item.key === data.fineType)
                        ?.name
                    : "boş"}</span>
        </h3>
        <h3>
          Tarix: <span>{data?.createdAt
                    ? moment(data.createdAt).format("YYYY-MM-DD")
                    : "boş"}</span>
        </h3>
        <h3>
          Komment: <span>{data?.comment}</span>
        </h3>
        </div>
    
    </>
  );
};

export default FineMoreModal;
