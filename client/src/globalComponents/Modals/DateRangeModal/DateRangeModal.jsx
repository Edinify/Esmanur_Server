import React, { useState } from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
import "./dateRangeModal.css";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import locale from "antd/locale/az_AZ";
import dayjs from "dayjs";

import "dayjs/locale/az";

const { RangePicker } = DatePicker;

const DateRangeModal = ({ setOpenCalendar, applyFilter, type = "" }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getDates = (value, dateString) => {
    setStartDate(new Date(dateString[0]));
    setEndDate(new Date(dateString[1]));
  };
  const getMonthsStart = (value, dateString) => {
    setStartDate(dateString);
  };
  const getMonthsEnd = (value, dateString) => {
    setEndDate(dateString);
  };

  return (
    <div className="date-range-modal" onMouseDown={(e) => e.stopPropagation()}>
      <div className="date-range-modal-con">
        <div className="close-icon" onClick={() => setOpenCalendar(false)}>
          <CloseBtn />
        </div>

        {type === "months" ? (
          <ConfigProvider locale={locale}>
            <div className="date-box">
              <h2 className="date-title">Başlama tarixi</h2>
              <DatePicker
                style={{ marginRight: 8 }}
                picker="month"
                onChange={getMonthsStart}
                format="YYYY-MM"
              />
            </div>
            <div className="date-box">
              <h2 className="date-title">Bitmə tarixi</h2>
              <DatePicker
                picker="month"
                onChange={getMonthsEnd}
                format="YYYY-MM"
              />
            </div>
          </ConfigProvider>
        ) : (
          <Space placement="bottomLeft" direction="vertical" size={12}>
            <ConfigProvider locale={locale}>
              <RangePicker onChange={getDates} />
            </ConfigProvider>
          </Space>
        )}

        <button
          className="apply-btn"
          onClick={() => applyFilter(startDate, endDate)}
        >
          Tətbiq et
        </button>
      </div>
    </div>
  );
};

export default DateRangeModal;
