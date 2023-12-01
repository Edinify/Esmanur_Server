import React, { useEffect } from 'react';
import "./notFoundPage.css";
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFoundPageImg from "../../assets/images/notfound.svg";

const NotFoundPage = ({setNotFound}) => {
  const {user} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const handleNav=()=>{
    if(user.role==="admin"){
      navigate("/finance/incomes")
    }
    else if (user.role==="super-admin"){
      navigate("/branches")
    }
  }

  useEffect(()=>{
    setNotFound(true);
    return ()=>{
      setNotFound(false)
    }
  },[setNotFound])

  return (
    <div className='not-found-page'>
      <div className="container">
        <div className="not-found-page-component">
          <img src={NotFoundPageImg} alt="" />
          <p>Oops! Bağışlayın, bu səhifə işləmir. Əsas səhifəyə qayıtmaq üçün bura klikləyin.</p>
          <button onClick={handleNav} className='return-btn' >Ana səhifəyə dön</button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;