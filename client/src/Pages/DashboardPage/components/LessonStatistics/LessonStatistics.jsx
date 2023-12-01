import React, { useState, useEffect } from "react";
import "./lessonStatistics.css";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getDashboardCourseStatisticAction } from "../../../../redux/actions/dashboardAction";

const LessonStatistics = ({ type }) => {
  const dispatch = useDispatch();
  const { courseStatistic } = useSelector((state) => state.dashboardData);
  const colors = ["#FBB216", "#462AFF", "#9A9A9A", "#00BC85", "#0AB3F9", '#85DAFB', '#FF462A', '#8F70FF', '#FFCA28', '#F06292', '#FFCA28']
  const labels =
    courseStatistic && courseStatistic.length > 0
      ? courseStatistic?.map((item) => {
          return item.courseName;
        })
      : ['Fənn'];
  const values =
    courseStatistic && courseStatistic.length > 0
      ? courseStatistic?.map((item) => {
          return item.value;
        })
      : [1];
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const series = values.find((item) => item !== 0) ? [...values] : [...new Array(values.length).fill(1)];
  const options = {
    colors: [...colors],
    labels: [...labels],
    chart: {
      width: "100%",
      // height: 500,
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 700,
        options: {
          chart: {
            height: "200px",
          },
          legend: {
            position: "left",
            with: '100%'
            // offsetY: 38,
          },
        },
      },
      {
        breakpoint: 450,
        options: {
          chart: {
            height: "350px",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      // // floating: true,
      // height: "100%",
      width: "100%",
      labels: {
        useSeriesColors: true,
      },
      horizontalAlign: "left",
      itemMargin: {
        horizontal: 10,
        vertical: 5
    },
    },
  };

  const applyFilter = (startDate, endDate) => {
    dispatch(getDashboardCourseStatisticAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDateDropdown(false);
  };
  const applyMonthsFilter = (option) => {
    dispatch(getDashboardCourseStatisticAction("", "", option.key));
  };

  useEffect(() => {
    dispatch(getDashboardCourseStatisticAction("", "", 1));
  }, []);


  return (
    <>
      <section className="lesson-statistics">
        <div className="content-box">
          <div className="top">
            <h2 className="title">Fənlərin statistikası</h2>
            {type !== "mobile" ? (
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDateDropdown}
                setOpenDropdown={setOpenDateDropdown}
                applyMonthsFilter={applyMonthsFilter}
              />
            ) : (
              <DateDropdown
                optionType={"date"}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDateDropdown}
                setOpenDropdown={setOpenDateDropdown}
                applyMonthsFilter={applyMonthsFilter}
              />
            )}
          </div>

          <div className="bottom">
            <Chart
              options={options}
              series={series}
              type="donut"
              width="100%"
              height="400px"
            />
{/* 
            <div className="labels-con">
              {labels.map((label, index) => index < 6 && (
                <div key={index} className="label-box">
                  <div className="label-dot"></div>
                  <p>{label}</p>
                </div>
              ))}
            </div> */}
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

export default LessonStatistics;
