import React from "react";
import moment from "moment";
import "moment/locale/az";

const StudentMoreModal = ({ studentsModalData, courses }) => {
  return (
    <>
      <div className="more-modal-header-inform">
        <h3>
          Ad soyad: <span>{studentsModalData?.fullName}</span>
        </h3>
        <h3>
          Doğum günü:{" "}
          <span>
            {studentsModalData?.birthday
              ? moment(studentsModalData.birthday)
                  .locale("az")
                  .format("DD MMMM YYYY")
              : ""}
          </span>
        </h3>
        <h3>
          FIN: <span>{studentsModalData?.fin}</span>
        </h3>
        <h3>
          Seria nömrəsi: <span>{studentsModalData?.seria}</span>
        </h3>
        <h3>
          Sağlamlıq statusu: <span>{studentsModalData?.healthStatus}</span>
        </h3>
        <h3>
          Ana haqqında məlumat:{" "}
          <span>
            {studentsModalData?.motherName}, {studentsModalData?.motherPhone}
          </span>
        </h3>
        <h3>
          Ata haqqında məlumat:{" "}
          <span>
            {studentsModalData?.fatherName}, {studentsModalData?.fatherPhone}
          </span>
        </h3>
        <h3>
          Telefon nömrəsi: <span>{studentsModalData?.emergencyPhone}</span>
        </h3>
        <h3>
          Email: <span>{studentsModalData?.email}</span>
        </h3>
        {/* <h3>ünvan: <span>{studentsModalData.whereFrom}</span></h3> */}
      </div>

      <div className="more-modal-work-inform">
        <h2>Təhsil məlumatları</h2>
        <div className="work-inform-con">
          <h3>
            Fənn:<span>{courses}</span>
          </h3>
          {/* <h3>Sektor:<span>{teachersModalData.sector}</span></h3> */}

          <h3>
            Status:
            <span
              className={`more-status ${
                studentsModalData?.status === true ? "active" : ""
              }`}
            >
              {studentsModalData?.status === true ? "Aktiv" : "Deaktiv"}
            </span>
          </h3>
          <h3>
            Dərsin qiyməti:
            <span>{studentsModalData?.payment} AZN</span>
          </h3>
          <h3>
            Qoşulma tarixi:
            <span>
              {studentsModalData?.createdAt
                ? moment(studentsModalData.createdAt)
                    .locale("az")
                    .format("DD MMMM YYYY")
                : ""}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default StudentMoreModal;
