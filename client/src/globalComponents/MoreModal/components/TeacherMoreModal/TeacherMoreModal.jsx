import React from "react";
import moment from "moment";
import "moment/locale/az";

const TeacherMoreModal = ({teachersModalData, courses}) => {

  console.log(teachersModalData)
  return (
    <>
      <div className="more-modal-header-inform">
        <h3>
          Ad soyad: <span>{teachersModalData.fullName}</span>
        </h3>
        <h3>
          Doğum günü:{" "}
          <span>
            {teachersModalData?.birthday
              ? moment(teachersModalData.birthday)
                  .locale("az")
                  .format("DD MMMM YYYY")
              : ""}
          </span>
        </h3>
        <h3>
          FIN: <span>{teachersModalData.fin}</span>
        </h3>
        <h3>
          Seria nömrəsi: <span>{teachersModalData.seria}</span>
        </h3>
        <h3>
          Telefon nömrəsi: <span>{teachersModalData.phone}</span>
        </h3>
        <h3>
          Email: <span>{teachersModalData.email}</span>
        </h3>
        <h3>
          Sağlamlıq statusu: <span>{teachersModalData.healthStatus}</span>
        </h3>
        <h3>
          İş təcrübəsi: <span>{teachersModalData.workExperience}</span>
        </h3>
        <h3>
          Ailə vəziyyəti: <span>{teachersModalData.maritalStatus}</span>
        </h3>
      </div>
      <div className="more-modal-work-inform">
        <h2>İş məlumatları</h2>
        <div className="work-inform-con">
          <h3>
            Fənn:<span>{courses}</span>
          </h3>
          {/* <h3>Sektor:<span>{teachersModalData.sector}</span></h3> */}
          <h3>
            Əmək haqqı:<span>{teachersModalData.salary?.value} {teachersModalData.salary.hourly ? "saatlıq" :"aylıq"}</span>
          </h3>
          <h3>
            Status:
            <span
              className={`more-status ${
                teachersModalData.status === true ? "active" : ""
              }`}
            >
              {teachersModalData.status === true ? "Aktiv" : "Deaktiv"}
            </span>
          </h3>
          <h3>
            Qoşulma tarixi:
            <span>
              {teachersModalData?.createdAt
                ? moment(teachersModalData.createdAt)
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

export default TeacherMoreModal;
