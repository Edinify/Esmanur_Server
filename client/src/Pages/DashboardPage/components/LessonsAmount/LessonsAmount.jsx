import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/dashboard/check.svg";
import { ReactComponent as Xicon } from "../../../../assets/icons/dashboard/x-close.svg";
import { ReactComponent as HelpCircle } from "../../../../assets/icons/dashboard/help-circle-dashboard.svg";
import {
  getDashboardCancelledLessonsAction,
  getDashboardConfirmedLessonsAction,
  getDashboardUnviewedLessonsAction
} from "../../../../redux/actions/dashboardAction";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";

const LessonsAmount = () => {
  const dispatch = useDispatch();
  const { confirmedLessonsData, cancelledLessonsData, unviewedLessonsData } = useSelector(
    (state) => state.dashboardData
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCancelled, setOpenDropdownCancelled] = useState(false);
  const [openDropdownConfirmed, setOpenDropdownConfirmed] = useState(false);
  const unvieweLessonsCount = unviewedLessonsData?.length > 0 && unviewedLessonsData.reduce((total, item) => {return total + item?.lessons?.length}, 0)

  const applyConfirmedFilter = (startDate, endDate) => {
    dispatch(getDashboardConfirmedLessonsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyCancelledFilter = (startDate, endDate) => {
    dispatch(getDashboardCancelledLessonsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyFilter = (startDate, endDate) => {
    if (openDropdownConfirmed) {
      applyConfirmedFilter(startDate, endDate);
    } else if (openDropdownCancelled) {
      applyCancelledFilter(startDate, endDate);
    }
  };
  const applyMonthsConfirmedFilter = (option) => {
    dispatch(getDashboardConfirmedLessonsAction("", "", option.key));
  };
  const applyMonthsCancelledFilter = (option) => {
    dispatch(getDashboardCancelledLessonsAction("", "", option.key));
  };

  useEffect(() => {
    if (openDropdownCancelled) {
      setOpenDropdownConfirmed(false);
    }
  }, [openDropdownCancelled]);
  useEffect(() => {
    if (openDropdownConfirmed) {
      setOpenDropdownCancelled(false);
    }
  }, [openDropdownConfirmed]);


  useEffect(() => {
    dispatch(getDashboardConfirmedLessonsAction("", "", 1));
    dispatch(getDashboardCancelledLessonsAction("", "", 1));
    dispatch(getDashboardUnviewedLessonsAction("", "", 1));
  }, [dispatch]);

  return (
    <>
      <section className="lessons-amount">
        <div className="content-box">
          <div className="left green">
            <CheckIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Təsdiqlənmiş dərslər</h2>
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownConfirmed}
                setOpenDropdown={setOpenDropdownConfirmed}
                applyMonthsFilter={applyMonthsConfirmedFilter}
              />
            </div>
            <p className="amount">
              {confirmedLessonsData ? confirmedLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box cancelled-lessons">
          <div className="left red">
            <Xicon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Ləvğ edilmiş dərslər</h2>
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownCancelled}
                setOpenDropdown={setOpenDropdownCancelled}
                applyMonthsFilter={applyMonthsCancelledFilter}
              />
            </div>
            <p className="amount">
              {cancelledLessonsData ? cancelledLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box">
          <div className="left grey">
            <HelpCircle />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Baxılmamış dərslər</h2>
            </div>
            <p className="amount">{unvieweLessonsCount ? unvieweLessonsCount : 0}</p>
          </div>
        </div>
      </section>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </>
  );
};

export default LessonsAmount;
