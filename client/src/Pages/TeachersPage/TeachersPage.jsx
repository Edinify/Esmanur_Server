import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersPaginationAction } from "../../redux/actions/teachersActions";
import { TEACHERS_MODAL_ACTION_TYPE} from "../../redux/actions-type";
import TeachersData from "./components/TeachersData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.teachersPagination);
  const { teachersSearchValues } = useSelector((state) => state.searchValues);
  const [teacherPageNum, setTeacherPageNum] = useState(1);
  const {teacherStatus} = useSelector(state=>state.teacherStatus);
  const { category } = useSelector((state) => state.teachersCategory);


  const getPageNumber = (pageNumber) => {
    setTeacherPageNum(pageNumber);
    if (teachersSearchValues) {
      dispatch(getTeachersPaginationAction(
        pageNumber, 
        teachersSearchValues,
        teacherStatus ? (teacherStatus !=="all" ? teacherStatus : "all") : "all"

        ));
    } else {
      dispatch(getTeachersPaginationAction(
        pageNumber,
         "",
         teacherStatus ? (teacherStatus !=="all" ? teacherStatus : "all") : "all"
          ));
    }
  };
  const openModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getTeachersPaginationAction(1, teachersSearchValues,
      teacherStatus ? (teacherStatus !=="all" ? teacherStatus : "all") : "all"

      ));
    setTeacherPageNum(1);
  };

  useEffect(() => {
    if (teachersSearchValues) {
      dispatch(getTeachersPaginationAction(1, teachersSearchValues, "all"
        ));
    } else {
      dispatch(getTeachersPaginationAction(1, "","all"));
    }
  }, [dispatch]);
  useEffect(() => {
    if (lastPage) {
      setTeacherPageNum(lastPage);
    }
  }, [lastPage]);
  useEffect(()=>{
    getPageNumber(1)
  },[teacherStatus])


  return (
    <div className="details-page teachers-page ">
      <GlobalHead 
      searchData={searchData} 
      openModal={openModal} 
      DATA_SEARCH_VALUE={'TEACHERS_SEARCH_VALUE'} 
      dataSearchValues={teachersSearchValues}
      statusType='teachers'
      />
      <TeachersData teacherPageNum={teacherPageNum} getPageNumber={getPageNumber} />
    </div>
  );
};

export default TeachersPage;
