import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./moreModal.css";
import { ReactComponent as EditIcon } from "../../assets/icons/more-modal/edit-02.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/more-modal/x-close.svg";
import {
  BONUS_MODAL_ACTION_TYPE,
  FINE_MODAL_ACTION_TYPE,
  TEACHERS_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import "moment/locale/az";
import TeacherMoreModal from "./components/TeacherMoreModal/TeacherMoreModal";
import StudentMoreModal from "./components/StudentMoreModal/StudentMoreModal";
import BonusMoreModal from "./components/BonusMoreModal/BonusMoreModal";
import FineMoreModal from "./components/FineMoreModal/FineMoreModal";

const MoreModal = ({ setOpenMoreModal, type, data }) => {
  const dispatch = useDispatch();
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);
  const { bonusModalData } = useSelector((state) => state.bonusModal);
  const { fineModalData } = useSelector((state) => state.fineModal);
  const [deleteModal, setDeleteModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  let courses =
    type === "teacher"
      ? Array.isArray(teachersModalData.courses) &&
        teachersModalData.courses.length > 0
        ? teachersModalData.courses
            .map((course) => {
              return course.name;
            })
            .join(", ")
        : "boş"
      : Array.isArray(studentsModalData.courses) &&
        studentsModalData.courses.length > 0
      ? studentsModalData.courses
          .map((course) => {
            return `${course.course.name} (${course.lessonAmount} dərs)`;
          })
          .join(", ")
      : "boş";

  const openUpdateModal = () => {
    if (type === "teacher") {
      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
        payload: {
          data: {
            ...teachersModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "student") {
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
        payload: {
          data: {
            ...studentsModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "bonus") {
      dispatch({
        type: BONUS_MODAL_ACTION_TYPE.GET_BONUS_MODAL,
        payload: {
          data: {
            ...bonusModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "fine") {
      dispatch({
        type: FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL,
        payload: {
          data: { ...fineModalData },
          openModal: true,
        },
      });
    }

    setOpenMoreModal(false);
  };

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          {type === "teacher" || type === "student" ? (
            <h2>Şəxsi məlumatlar</h2>
          ) : (
            ""
          )}
          <div className="more-modal-header-icons">
          {user.role==="super-admin"?
           <div
           className={
             type === "feedback-teacher" || type === "feedback-student"
               ? "header-icon-delete"
               : "header-icon-edit"
           }
         >
           <EditIcon onClick={() => openUpdateModal()} />
         </div>
         :null
           }
           
            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenMoreModal(false)} />
            </div>
          </div>
        </div>

        {type === "teacher" && (
          <TeacherMoreModal
            teachersModalData={teachersModalData}
            courses={courses}
          />
        )}
        {type === "student" && (
          <StudentMoreModal
            studentsModalData={studentsModalData}
            courses={courses}
          />
        )}
        {type === "bonus" && (
          <BonusMoreModal bonusModalData={bonusModalData} data={data} />
        )}
        {type === "fine" && <FineMoreModal data={data} />}
      </div>
    </div>
  );
};

export default MoreModal;
