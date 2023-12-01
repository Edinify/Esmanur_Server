import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DropdownArrowFinanceIcon1 } from "../../../../assets/icons/dashboard/arrow-down-finance1.svg";
import { ReactComponent as DropdownArrowFinanceIcon2 } from "../../../../assets/icons/dashboard/arrow-up.svg";
import { ReactComponent as TurnoverIcon } from "../../../../assets/icons/dashboard/refresh-cw-02.svg";
import { ReactComponent as ProfitIcon } from "../../../../assets/icons/dashboard/bank-note-01.svg";
import StudentsAmount from "../StudentsAmount/StudentsAmount";
import LessonStatistics from "../LessonStatistics/LessonStatistics";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import WhereHeard from "../WhereHeard/WhereHeard";
import { getDashboardFinanceAction } from "../../../../redux/actions/dashboardAction";

const FinanceStatistics = ({dashboardKeys}) => {
  const dispatch = useDispatch();
  const {dashboardFinanceData} = useSelector((state) => state.dashboardData);

  // useEffect(() => {
  //   dispatch(getDashboardFinanceAction())
  // }, [])

  return (
    <section className="finance-statictics">
      <div className="finance-statictics-con">
        <div className="content-box finance">
          <div className="left blue">
            <DropdownArrowFinanceIcon1 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aylıq mədaxil</h2>
              <div className="diff-pointer plus">+36.47%</div>
            </div>
            <p className="amount">₼ {dashboardFinanceData?.income ? dashboardFinanceData?.income : 0}</p>
          </div>
        </div>

        <div className="content-box finance">
          <div className="left red">
            <DropdownArrowFinanceIcon2 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aylıq xərc</h2>
              <div className="diff-pointer minus">-36.47%</div>
            </div>
            <p className="amount">₼ {dashboardFinanceData?.expense ? dashboardFinanceData?.expense : 0}</p>
          </div>
        </div>

        <div className="content-box finance">
          <div className="left orange">
            <TurnoverIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aylıq dövriyyə</h2>
              <div className="diff-pointer plus">+36.47%</div>
            </div>
            <p className="amount">₼ {dashboardFinanceData?.turnover ? dashboardFinanceData?.turnover : 0}</p>
          </div>
        </div>

        <div className="content-box finance last">
          <div className="left green">
            <ProfitIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aylıq qazanc</h2>
              <div className="diff-pointer plus">+36.47%</div>
            </div>
            <p className="amount">₼ {dashboardFinanceData?.profit ? dashboardFinanceData?.profit : 0}</p>
          </div>
        </div>
      </div>

      <div className="tablet-last-box">
        <div className="left">
          <div className="content-box finance">
            <div className="left green">
              <ProfitIcon />
            </div>

            <div className="right">
              <div className="top">
                <h2 className="title">Aylıq qazanc</h2>
                <div className="diff-pointer plus">+36.47%</div>
              </div>
              <p className="amount">₼ {dashboardFinanceData?.profit ? dashboardFinanceData?.profit : 0}</p>
            </div>
          </div>
          <LessonStatistics />
          <WhereHeard dashboardKeys={dashboardKeys} />
        </div>

        <div className="right">
          <StudentsAmount />
          <LeaderBoard  type='mobile' />
        </div>
      </div>
    </section>
  );
};

export default FinanceStatistics;
