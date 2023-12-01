import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getDashboardStudentsAmountAction } from "../../../../redux/actions/dashboardAction";

const StudentsAmount = () => {
  const dispatch = useDispatch();
  const { dashboardStudentsAmount } = useSelector(
    (state) => state.dashboardData
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const monthsLang = [
    // { key: "January", name: "Yanvar" },
    // { key: "February", name: "Fevral" },
    // { key: "March", name: "Mart" },
    // { key: "April", name: "Aprel" },
    // { key: "May", name: "May" },
    // { key: "June", name: "Iyun" },
    // { key: "July", name: "Iyul" },
    // { key: "August", name: "Avqust" },
    // { key: "September", name: "Sentyabr" },
    // { key: "October", name: "Oktyabr" },
    // { key: "November", name: "Noyabr" },
    // { key: "December", name: "Dekabr" },
    { key: "January", name: "Yan" },
    { key: "February", name: "Fev" },
    { key: "March", name: "Mar" },
    { key: "April", name: "Apr" },
    { key: "May", name: "May" },
    { key: "June", name: "İyn" },
    { key: "July", name: "İyl" },
    { key: "August", name: "Avq" },
    { key: "September", name: "Sen" },
    { key: "October", name: "Okt" },
    { key: "November", name: "Noy" },
    { key: "December", name: "Dek" },
  ];
  const differentYears = dashboardStudentsAmount?.months?.find((item) => {
    return item.year !== dashboardStudentsAmount?.months[0].year;
  })
    ? true
    : false;
  const labels =
    dashboardStudentsAmount && dashboardStudentsAmount.months?.length > 0
      ? dashboardStudentsAmount.months.map((item) => {
          return `${monthsLang.find((data) => data.key === item.month)?.name} ${
            // differentYears ? item.year : ""
            item.year
          }`;
        })
      : [];
  const values =
    dashboardStudentsAmount && dashboardStudentsAmount?.values?.length > 0
      ? dashboardStudentsAmount?.values.map((item) => {
          return item;
        })
      : [];

  const applyFilter = (startDate, endDate) => {
    dispatch(getDashboardStudentsAmountAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDateDropdown(false);
  };
  const applyMonthsFilter = (option) => {
    if (option.key === 1) {
      dispatch(getDashboardStudentsAmountAction("", "", 3));
    } else {
      dispatch(getDashboardStudentsAmountAction("", "", option.key));
    }
  };

  const areaChartOptions = {
    chart: {
      height: 280,
      type: "area",
      foreColor: "#717171",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#462AFF"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: [...labels],
    },
  };
  const areaChartSeries = [
    {
      name: "Tələbələrin sayı",
      data: [...values],
    },
  ];

  useEffect(() => {
    dispatch(getDashboardStudentsAmountAction("", "", 3));
  }, []);

  return (
    <>
      <section className="students-amount">
        <div className="content-box">
          <div className="top">
            <h2 className="title">Tələbələrin sayı</h2>
            <DateDropdown
              optionType={"date"}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              openDropdown={openDateDropdown}
              setOpenDropdown={setOpenDateDropdown}
              applyMonthsFilter={applyMonthsFilter}
              monthCount={3}
            />
          </div>

          <div className="bottom">
            <Chart
              options={areaChartOptions}
              series={areaChartSeries}
              type="area"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </section>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
          type="months"
        />
      )}
    </>
  );
};

export default StudentsAmount;
