import React from "react";
import { ReactComponent as AvatarIcon } from "../../../../assets/icons/dashboard/avatar.svg";

const OtherTeachers = ({ leadboard, byFilter }) => {
  return (
    <ul>
      {leadboard?.otherTeacher?.map((item, index) => (
        <li key={index}>
          <div className="left">
            <div className="number">
              {leadboard?.leaderTeacher?.length === 0 && index + 1}
              {leadboard?.leaderTeacher?.length === 1 && index + 2}
              {leadboard?.leaderTeacher?.length === 2 && index + 3}
              {leadboard?.leaderTeacher?.length === 3 && index + 4}
              {/* {index + 1} */}
            </div>
            <div className="avatar">
              <AvatarIcon />
            </div>
            <h3 className="user-name">{item?.teacher?.fullName} </h3>
          </div>

          <div className="right">
            <div className="score">
              {byFilter === "lessonCount" ? item.lessonCount : item.starCount}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OtherTeachers;
