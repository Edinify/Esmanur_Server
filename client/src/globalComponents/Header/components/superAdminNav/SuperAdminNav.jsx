import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SuperAdminNav = ({ setOpenMenu }) => {
  let nav = ["/student", "/"];
  const location = useLocation();

  const isActiveRoute = (route) => {
    return nav.includes(route);
  };

  return (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={(e) => {
          setOpenMenu(true);
        }}
      >
        İdarəetmə paneli
      </NavLink>

      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/"
        className={isActiveRoute(location.pathname) ? "active" : ""}
      >
        {" "}
        Davamiyyət{" "}
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/courses"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Fənlər
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/teachers"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Müəllimlər
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/students"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Tələbələr
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/table"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Cədvəl
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/salary"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Əmək haqqı
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/expenses"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Xərclər
      </NavLink>
      <NavLink
        onClick={(e) => {
          setOpenMenu(true);
        }}
        to="/incomes"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Mədaxil
      </NavLink>
    </>
  );
};

export default SuperAdminNav;
