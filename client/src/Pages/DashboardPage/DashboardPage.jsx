import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LessonsAmount from "./components/LessonsAmount/LessonsAmount";
import LessonStatistics from "./components/LessonStatistics/LessonStatistics";
import WhereHeard from "./components/WhereHeard/WhereHeard";
import StudentsAmount from "./components/StudentsAmount/StudentsAmount";
import FinanceStatistics from "./components/FinanceStatistics/FinanceStatistics";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import { getDashboardFinanceAction } from "../../redux/actions/dashboardAction";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [dashboardKeys, setDashboardKeys] = useState({});

  useEffect(() => {
    dispatch(getDashboardFinanceAction())
  }, []);

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-main desktop">
          <div className="left">
            <LessonsAmount />
            <LessonStatistics />
            <WhereHeard dashboardKeys={dashboardKeys} />
          </div>

          <div className="right">
            <div className="top">
              <StudentsAmount />
              <FinanceStatistics dashboardKeys={dashboardKeys} />
            </div>

            <div className="bottom">
              <LeaderBoard />
            </div>
          </div>
        </div>

        <div className="dashboard-main tablet">
          <LessonsAmount />
          <FinanceStatistics dashboardKeys={dashboardKeys} />
        </div>

        <div className="dashboard-main mobile">
          <LessonsAmount />
          <FinanceStatistics dashboardKeys={dashboardKeys} />
          <StudentsAmount />
          <LessonStatistics type="mobile" />
          <WhereHeard dashboardKeys={dashboardKeys} />
          <LeaderBoard type="mobile" />
        </div>
      </div>
      {/* <DashboardOld dashboardData={dashboardData} /> */}
    </div>
  );
};
