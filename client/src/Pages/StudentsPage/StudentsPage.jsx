import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsPaginationAction } from "../../redux/actions/studentsActions";
import { STUDENTS_MODAL_ACTION_TYPE} from "../../redux/actions-type";
import StudentsData from "./components/StudentsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector(state=>state.studentsPagination)
  const {studentSearchValues} = useSelector(state=>state.searchValues);
  const [studentPageNum, setStudentPageNum] = useState(1);
  const {studentStatus} = useSelector(state=>state.studentStatus);


  const getPageNumber = (pageNumber) => {
    setStudentPageNum(pageNumber)
    if(studentSearchValues) {
      dispatch(getStudentsPaginationAction(pageNumber,studentSearchValues,
        studentStatus ? (studentStatus !=="all" ? studentStatus : "all") : "all"
        ));
    } else {
      dispatch(getStudentsPaginationAction(pageNumber,'',
      studentStatus ? (studentStatus !=="all" ? studentStatus : "all") : "all"
      ));
    }
  }
  const openModal = () => {
    dispatch({type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL, payload: {data: {}, openModal: true} })
  };
  const searchData = (e) => {
    e.preventDefault()
    dispatch(getStudentsPaginationAction(1,studentSearchValues,
      studentStatus ? (studentStatus !=="all" ? studentStatus : "all") : "all"
      ))
    setStudentPageNum(1)
  }

  useEffect(() => {
    if(studentSearchValues) {
      dispatch(getStudentsPaginationAction(1,studentSearchValues,"all"))
    } else {
      dispatch(getStudentsPaginationAction(1,"","all"));
    }
  }, [dispatch]);
  useEffect(() => {
    if(lastPage) {
      setStudentPageNum(lastPage)
    }
  }, [lastPage])
  useEffect(()=>{
    getPageNumber(1)
  },[studentStatus])

  return (
    <div className="details-page students-page">
      <GlobalHead 
      searchData={searchData} 
      openModal={openModal} 
      DATA_SEARCH_VALUE={'STUDENTS_SEARCH_VALUE'} 
      dataSearchValues={studentSearchValues}
      statusType="student"
      />
      <StudentsData studentPageNum={studentPageNum} getPageNumber={getPageNumber} />
    </div>
  );
};

export default StudentsPage;
