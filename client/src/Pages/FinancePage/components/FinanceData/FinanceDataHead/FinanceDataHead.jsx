import React, { useState } from "react";
import "./financeDataHead.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  INCOMES_MODAL_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
  FOOD_RATION_MODAL_ACTION_TYPE,
  UNIFORMS_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
  STUDENT_PAYMENT_MODAL_ACTION_TYPE,
} from "../../../../../redux/actions-type";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/finance/Plus.svg";
import FinanceDropdown from "./FinanceDropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FinanceDataHead = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const openIncomesModal = () => {
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openExpensesModal = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openFoodRationModal = () => {
    dispatch({
      type: FOOD_RATION_MODAL_ACTION_TYPE.GET_FOOD_RATION_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openUniformModal = () => {
    dispatch({
      type: UNIFORMS_MODAL_ACTION_TYPE.GET_UNIFORMS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openStudentPaymentModal = () => {
    dispatch({
      type: STUDENT_PAYMENT_MODAL_ACTION_TYPE.GET_STUDENT_PAYMENT_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  const openModal = () => {
    if (location.pathname === "/finance/incomes") {
      openIncomesModal();
    } else if (location.pathname === "/finance/expenses") {
      openExpensesModal();
    } else if (location.pathname === "/finance/food-ration") {
      openFoodRationModal();
    } else if (location.pathname === "/finance/uniforms") {
      user.role === "super-admin" && openUniformModal();
    } else if (location.pathname === "/finance/student-payments") {
      user.role === "super-admin" && openStudentPaymentModal();
    }
  };
  return (
    <div className="finance-data-head">
      <div className="top">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={1}
          className="mySwiper"
          freeMode={true}
          breakpoints={{
            // when window width is >= 640px
            // 700: {
            //   slidesPerView: 5,
            // },
            // 768: {
            //   width: 768,
            //   slidesPerView: 2,
            // },
          }}
        >
          <SwiperSlide>
            <Link
              to="/finance/incomes"
              className={`data-type ${
                location.pathname === "/finance/incomes" ? "active" : ""
              }`}
            >
              Mədaxil
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/finance/expenses"
              className={`data-type ${
                location.pathname === "/finance/expenses" ? "active" : ""
              }`}
            >
              Xərc
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/finance/food-ration"
              className={`data-type ${
                location.pathname === "/finance/food-ration" ? "active" : ""
              }`}
            >
              Qida rasionu
            </Link>
          </SwiperSlide>
          {user.role === "super-admin" && (
            <SwiperSlide>
              <Link
                to="/finance/uniforms"
                className={`data-type ${
                  location.pathname === "/finance/uniforms" ? "active" : ""
                }`}
              >
                Formalar
              </Link>
            </SwiperSlide>
          )}
          {/* <SwiperSlide>
            <Link
              to="/finance/student-payments"
              className={`data-type ${
                location.pathname === "/finance/student-payments" ? "active" : ""
              }`}
            >
              Tələbə ödənişləri
            </Link>
          </SwiperSlide> */}
        </Swiper>
      </div>

      <div className="bottom">
        <div className="left">
          {/* {location.pathname !== "/finance/food-ration" && <FinanceDropdown type='category'  /> }
        {location.pathname !== "/finance/food-ration" && <FinanceDropdown type='sorting'  /> } */}
        </div>

        <div className="right">
          <button className="add-btn" onClick={() => openModal()}>
            <PlusIcon />
            Əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceDataHead;
