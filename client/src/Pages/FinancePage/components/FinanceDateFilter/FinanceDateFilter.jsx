import React, { useEffect, useState } from "react";
import "./financeDateFilter.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FINANCE_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";

const FinanceDateFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {    
    financeMonthsFilter,
    financeChooseDate} = useSelector((state) => state.financeDateFilter);
  const data = [
    { key: 1, name: "Cari ay" },
    { key: 3, name: "Son 3 ay" },
    { key: 6, name: "Son 6 ay" },
    { key: 12, name: "İllik" },
    { key: "", name: "Tarix seç" },
  ];
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    key: 1,
    name: "Cari ay",
  });

  const applyFilter = (startDate = "", endDate = "") => {
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_CHOOSE_DATE_FILTER,
      payload: { financeChooseDate: { startDate, endDate } },
    });
    setOpenCalendar(false);
  };

  const applyMonthFilter = (option) => {
    setOpenCalendar(false);
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
      payload: { financeMonthsFilter: option.key },
    });
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    if (option.name === "Tarix seç") {
      setOpenCalendar(!openCalendar);
    } else {
     applyMonthFilter(option)
    }
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
        payload: { financeMonthsFilter: '' },
      });
    }
  }, [financeMonthsFilter, financeChooseDate])

  return (
    <>
      <div className="finance-date-filter-con">
        <div className="finance-date-filter desktop">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => selectOption(item)}
              className={`content-box ${
                selectedOption.key === item.key ? "active" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="finance-date-filter mobile">
          <Swiper slidesPerView={4} spaceBetween={12} className="mySwiper">
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => selectOption(item)}
                  className={`content-box ${
                    selectedOption.key === item.key ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </>
  );
};

export default FinanceDateFilter;
