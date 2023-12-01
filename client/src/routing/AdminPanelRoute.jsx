import React from "react";
import { Route } from "react-router";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import FinancePage from "../Pages/FinancePage/FinancePage";
import BranchesPage from "../Pages/BranchesPage/BranchesPage";

const AdminPanelRoute = () => {
  return (
    <>
      <Route path="/students" element={<StudentsPage />} />
      {/* <Route path="/teachers" element={<TeachersPage />} /> */}
      <Route path="/finance/expenses" element={<FinancePage />} />
      <Route path="/finance/incomes" element={<FinancePage />} />
      <Route path="/finance/food-ration" element={<FinancePage />} />
      {/* <Route path="/branches" element={<BranchesPage />} /> */}
      {/* <Route path="/courses" element={<CoursesPage />} /> */}
    </>
  );
};

export default AdminPanelRoute;
