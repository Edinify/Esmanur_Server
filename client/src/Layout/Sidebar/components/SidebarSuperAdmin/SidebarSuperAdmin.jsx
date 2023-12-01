import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../../../assets/icons/dashboardIcon.svg";
import { ReactComponent as CoursesIcon } from "../../../../assets/icons/coursesIcon.svg";
import { ReactComponent as TeachersIcon } from "../../../../assets/icons/teachersIcon.svg";
import { ReactComponent as StudentsIcon } from "../../../../assets/icons/studentsIcon.svg";
import { ReactComponent as SalaryIcon } from "../../../../assets/icons/salaryIcon.svg";
import { ReactComponent as ExpensesIcon } from "../../../../assets/icons/expensenIcon.svg";
import { ReactComponent as IncomesIcon } from "../../../../assets/icons/incomesIcon.svg";
import { ReactComponent as AdminIcon } from "../../../../assets/icons/sidebar/users-01.svg";
import { useSelector } from "react-redux";

const SidebarSuperAdmin = ({ closeSidebar }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  let nav = ["/student", "/"];
  const isActiveRoute = (route) => {
    return nav.includes(route);
  };

  const stimulationNav = ["/stimulations/bonus", "/stimulations/fine"];
  const isActiveStimulationsRoute = (route) => {
    return stimulationNav.includes(route);
  };

  const financeNav = [
    "/finance/incomes",
    "/finance/expenses",
    "/finance/food-ration",
    "/finance/uniforms",
    "/finance/student-payments",
  ];

  const isFinanceRoute = (route) => {
    return financeNav.includes(route);
  };

  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Müəllimlər
        </NavLink>
      </li> */}
      <li className={user.branch ? '' : 'disabled'}>
        <NavLink
          to="/finance/incomes"
          onClick={closeSidebar}
          className={isFinanceRoute(location.pathname) ? "active" : ""}
        >
          <ExpensesIcon />
          Maliyyə
        </NavLink>
      </li>
      <li className={user.branch ? '' : 'disabled'}>
        <NavLink to="/admins" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Admin
        </NavLink>
      </li>
      <li>
        <NavLink to="/branches" onClick={closeSidebar} className="admin">
          <CoursesIcon />
          Filiallar
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <DashboardIcon />
          İdarəetmə paneli
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" onClick={closeSidebar}>
          <CoursesIcon />
          Fənlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/salary" onClick={closeSidebar}>
          <SalaryIcon />
          Əmək haqqı
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/stimulations/bonus"
          onClick={closeSidebar}
          className={
            isActiveStimulationsRoute(location.pathname) ? "active" : ""
          }
        >
          <IncomesIcon />
          Həvəsləndirmə
        </NavLink>
      </li> */}
    </ul>
  );
};

export default SidebarSuperAdmin;
