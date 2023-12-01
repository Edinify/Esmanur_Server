import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const TeacherNav = ({setOpenMenu}) => {
  const location = useLocation();

  return (
    <>
      <Link
      onClick={() => setOpenMenu(true)}
        to="/teacher-panel"
        className={location.pathname === "/teacher-panel" ? "active" : ""}
      >
        Cədvəl
      </Link>
      <Link
      onClick={() => setOpenMenu(true)}
        to="/teacher-panel/salary"
        className={
          location.pathname === "/teacher-panel/salary" ? "active" : ""
        }
      >
        Əmək haqqı
      </Link>
    </>
  );
};

export default TeacherNav;
