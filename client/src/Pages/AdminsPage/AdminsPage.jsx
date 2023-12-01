import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminsAction } from "../../redux/actions/adminsActions";
import { ADMINS_MODAL_ACTION_TYPE} from "../../redux/actions-type";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import AdminsData from "./components/AdminsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const AdminsPage = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  useEffect(() => {
      dispatch(getAdminsAction());
  }, [dispatch]);


  return (
    <div className="details-page admins-page">
      {/* <button onClick={() => getSomething(5)}>work</button> */}
      <GlobalHead 
      openModal={openModal} 
      search={false}
      />
      <AdminsData />
    </div>
  );
};

export default AdminsPage;
