import React from "react";
import "./dashboardPreview.css";
import DashboardImg from "../../../../assets/images/login-imgs/Dashboard.png";
import ChartImg from "../../../../assets/images/login-imgs/Chart.png";
import WhereHearImg from "../../../../assets/images/login-imgs/Where did they hear us from_.png";

const DashboardPreview = () => {
  return (
    <div className="dashboard-preview">
      <h2 className="title">
        This simplest way to manage your <br /> educational center...
      </h2>

      <div className="preview-imgs-con">
        <div className="preview-imgs">
          {/* <div className="preview-img area-chart-img">
            <img src={ChartImg} alt="" />
          </div>
          <div className="preview-img where-heard-img">
            <img src={WhereHearImg} alt="" />
          </div> */}
        <img src={DashboardImg} alt="" />

          <img src={ChartImg} alt="" className="area-chart-img" />
        <img src={WhereHearImg} alt="" className="where-heard-img" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
