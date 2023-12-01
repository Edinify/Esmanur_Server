import React from "react";
import moment from "moment";
import "moment/locale/az";

const BonusMoreModal = ({data}) => {

  return (
    <>
      <div className="more-modal-header-inform">
          <h2>{data?.teacher.fullName}</h2>
        <h3>
          Bonus: <span>{data?.amount}</span>
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

export default BonusMoreModal;
