import React from "react";
import { Route } from "react-router";
import { Dashboard } from "../Pages/DashboardPage/DashboardPage";
import SalaryPage from "../Pages/SalaryPage/SalaryPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import StimulationPage from "../Pages/StimulationPage/StimulationPage";
import FinancePage from "../Pages/FinancePage/FinancePage";
import AdminsPage from "../Pages/AdminsPage/AdminsPage";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import BranchesPage from "../Pages/BranchesPage/BranchesPage";

const SuperAdminPanelRoute = () => {
  
  return (
    <>
      <Route path="/students" element={<StudentsPage />} />
      {/* <Route path="/teachers" element={<TeachersPage />} /> */}
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/finance/expenses" element={<FinancePage />} />
      <Route path="/finance/incomes" element={<FinancePage />} />
      <Route path="/finance/food-ration" element={<FinancePage />} />
      <Route path="/finance/uniforms" element={<FinancePage />} />
      <Route path="/finance/student-payments" element={<FinancePage />} />
      <Route path="/branches" element={<BranchesPage />} />


      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/salary" element={<SalaryPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/stimulations" element={<StimulationPage />} />
      <Route path="/stimulations/fine" element={<StimulationPage />} />
      <Route path="/stimulations/bonus" element={<StimulationPage />} /> */}
    </>
  );
};

export default SuperAdminPanelRoute;
