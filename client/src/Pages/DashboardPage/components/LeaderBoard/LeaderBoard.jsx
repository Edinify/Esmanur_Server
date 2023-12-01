import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AvatarIcon } from "../../../../assets/icons/dashboard/avatar.svg";
import { ReactComponent as LightIcon } from "../../../../assets/icons/dashboard/light-svg.svg";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import OtherTeachers from "./OtherTeachers";
import { getDashboarLeadboarddAction } from "../../../../redux/actions/dashboardAction";

const LeaderBoard = ({ type }) => {
  const dispatch = useDispatch();
  const {leadboard} = useSelector((state) => state.dashboardData);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCalendar, setOpenDropdownCalendar] = useState(false);
  const [openDropdownStars, setOpenDropdownStars] = useState(false);
  const [byFilter, setByFilter] = useState('lessonCount')
  
  const applyFilter = (startDate, endDate) => {
    dispatch(getDashboarLeadboarddAction(startDate, endDate,"",byFilter))
    setOpenCalendar(false);
    setOpenDropdownCalendar(false);
  };
  const applyMonthsFilter = (option) => {
    dispatch(getDashboarLeadboarddAction("","",option.key,byFilter))
  };
    
  const applyFilterStars = (type) => {
    setByFilter(type.key)
    dispatch(getDashboarLeadboarddAction("","",1,type.key))
    setOpenCalendar(false);
    setOpenDropdownCalendar(false);
    setOpenDropdownStars(false);
  };
  useEffect(()=>{
    dispatch(getDashboarLeadboarddAction("","",1,byFilter))
  },[])


  return (
    <>
      <section className="leaderboard">
        <div className="top desktop">
          <div className="top-mobile">
            <h2 className="title">Uğur lövhəsi</h2>

            <div className="leaderboard-filter">
              {type === "mobile" ? (
                <DateDropdown
                  optionType={"date"}
                  calendar={true}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  openDropdown={openDropdownCalendar}
                  setOpenDropdown={setOpenDropdownCalendar}
                  applyMonthsFilter={applyMonthsFilter}
                />
              ) : (
                <DateDropdown
                  optionType={"date"}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  openDropdown={openDropdownCalendar}
                  setOpenDropdown={setOpenDropdownCalendar}
                  applyMonthsFilter={applyMonthsFilter}
                />
              )}
              <DateDropdown
                optionType={"stars"}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownStars}
                setOpenDropdown={setOpenDropdownStars}
                applyMonthsFilter={applyMonthsFilter}
                applyFilterStars={applyFilterStars}
              />
            </div>
          </div>

          <h2 className="title desktop">Uğur lövhəsi</h2>

          <div className="leaderboard-main">
            <div className="content-box second">
              <div className="user-img-con">
                <AvatarIcon />
              </div>

              <h3 className="user-name">{leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[1]?.teacher?.fullName : 'Müəllim 2'}</h3>

              <div className="rank-con">
                <svg
                  className="rank-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="112"
                  height="51"
                  viewBox="0 0 112 51"
                  fill="none"
                >
                  <rect y="12" width="112" height="39" fill="#A7B1CA" />
                  <path d="M24 0H112V12H0L24 0Z" fill="#E0E2E9" />
                </svg>

                <div className="scores">
                  <div className="rank">
                    2 <span>ci</span>
                  </div>
                  <div className="amount">
                    {byFilter === 'lessonCount' ?
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[1]?.lessonCount : '0'
                    :
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[1]?.starCount : '0'
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="content-box first">
              <div className="user-img-con">
                <AvatarIcon />

                {/* <img
                src="https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fHww&w=1000&q=80"
                alt=""
              /> */}
              </div>

              <h3 className="user-name">{leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[0]?.teacher?.fullName : 'Müəllim 1'}</h3>

              <div className="rank-con">
                <LightIcon />
                <svg
                  className="rank-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="112"
                  height="67"
                  viewBox="0 0 112 67"
                  fill="none"
                >
                  <rect y="10" width="112" height="57" fill="#FFDA0D" />
                  <path d="M22 0H89.9999L112 10H0L22 0Z" fill="#FFEA74" />
                </svg>

                <div className="scores">
                  <div className="rank">
                    1 <span>ci</span>
                  </div>
                  <div className="amount">
                    {byFilter === 'lessonCount' ?
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[0]?.lessonCount : '0'
                    :
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[0]?.starCount : '0'
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="content-box third">
              <div className="user-img-con">
                <AvatarIcon />

                {/* <img
                src="https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fHww&w=1000&q=80"
                alt=""
              /> */}
              </div>

              <h3 className="user-name">{leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[2]?.teacher?.fullName : 'Müəllim 3'}</h3>

              <div className="rank-con">
                <svg
                  className="rank-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="112"
                  height="41"
                  viewBox="0 0 112 41"
                  fill="none"
                >
                  <rect y="12" width="112" height="29" fill="#D89142" />
                  <path d="M0 0H86.9999L112 12H0V0Z" fill="#EAA75E" />
                </svg>

                <div className="scores">
                  <div className="rank">
                    3 <span>cü</span>
                  </div>
                  <div className="amount">
                    {byFilter === 'lessonCount' ?
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[2]?.lessonCount : '0'
                    :
                    leadboard?.leaderTeacher?.length > 0 ? leadboard?.leaderTeacher[2]?.starCount : '0'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="leaderboard-filter desktop">
            {type === "mobile" ? (
              <DateDropdown
              optionType={"date"}
              calendar={true}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              openDropdown={openDropdownCalendar}
              setOpenDropdown={setOpenDropdownCalendar}
              applyMonthsFilter={applyMonthsFilter}
              />
            ) : (
              <DateDropdown
              optionType={"date"}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              openDropdown={openDropdownCalendar}
              setOpenDropdown={setOpenDropdownCalendar}
              applyMonthsFilter={applyMonthsFilter}
            />
            )}
             <DateDropdown
                optionType={"stars"}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownStars}
                setOpenDropdown={setOpenDropdownStars}
                applyMonthsFilter={applyMonthsFilter}
                applyFilterStars={applyFilterStars}
              />
          </div>
        </div>

        <div className="bottom">
          <OtherTeachers byFilter={byFilter} leadboard={leadboard} />
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

export default LeaderBoard;
