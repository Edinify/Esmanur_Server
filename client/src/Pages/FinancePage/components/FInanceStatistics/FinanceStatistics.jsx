import React, { useEffect, useState } from "react";
import "./financeStatistics.css";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DropdownArrowFinanceIcon1 } from "../../../../assets/icons/dashboard/arrow-down-finance1.svg";
import { ReactComponent as DropdownArrowFinanceIcon2 } from "../../../../assets/icons/dashboard/arrow-up.svg";
import { ReactComponent as TurnoverIcon } from "../../../../assets/icons/dashboard/refresh-cw-02.svg";
import { ReactComponent as ProfitIcon } from "../../../../assets/icons/dashboard/bank-note-01.svg";
import {getFinanceDataAction} from '../../../../redux/actions/financeAction'
import moment from "moment";

const FinanceStatistics = () => {
  const dispatch = useDispatch();
  const {financeData} = useSelector((state) => state.financeData);
  const { financeMonthsFilter, financeChooseDate } = useSelector((state) => state.financeDateFilter);

  useEffect(() => {
    dispatch(getFinanceDataAction("", "", 1))
  }, [])

  useEffect(() => {
    if(financeChooseDate?.startDate && financeChooseDate?.endDate) {
      const start = (moment(financeChooseDate?.startDate).format("YYYY-MM"));
      const end = (moment(financeChooseDate?.endDate).format("YYYY-MM"))
      dispatch(getFinanceDataAction(start, end, ''))
    }
  }, [financeChooseDate])

  useEffect(() => {
    if(financeMonthsFilter) {
      dispatch(getFinanceDataAction("", "", financeMonthsFilter))
    }
  }, [financeMonthsFilter])

  return (
    <div className="finance-statictics">
      <div className="content-box finance">
        <div className="left blue">
          <DropdownArrowFinanceIcon1 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Mədaxil</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.income ? financeData?.income : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance">
        <div className="left red">
          <DropdownArrowFinanceIcon2 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Xərc</h2>
            <div className="diff-pointer minus">-36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.expense ? financeData?.expense : 0}
            <small className="diff-pointer minus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance">
        <div className="left orange">
          <TurnoverIcon />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Qida xərcləri</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.foodExpense ? financeData?.foodExpense : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance last">
        <div className="left green">
          <ProfitIcon />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Qazanc</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.profit ? financeData?.profit : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceStatistics;
