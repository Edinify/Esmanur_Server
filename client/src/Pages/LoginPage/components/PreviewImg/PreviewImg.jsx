import DashboardImg from "../../../../assets/images/login-imgs/Dashboard.png"
import ChartImg from "../../../../assets/images/login-imgs/Chart.png"
import WhereHearImg from "../../../../assets/images/login-imgs/Where did they hear us from_.png"
import DashboardMobileImg from "../../../../assets/images/login-imgs/Dashboard - Mobile.png"
import DashboardTabletImg from "../../../../assets/images/login-imgs//Dashboard - Tablet.png"


const PreviewImg = () => {
  return (
    <div className="login-left">
        <div className="left-container">
          <p>
            This simplest way to manage your <br />
            educational center...
          </p>
          <div className="left-img-container">
            {/* <img src={ChartImg} alt="/" className="chart-img" /> */}
            {/* <img className="dashboard-img" src={DashboardImg} alt="/" /> */}
            {/* <img src={DashboardTabletImg} alt="/" className="dashboard-img-tablet" /> */}
            {/* <img src={DashboardMobileImg} alt="/" className="dashboard-img-mobile" /> */}
            {/* <img src={WhereHearImg} alt="/"  className="where-hear-img"/> */}
          </div>
        </div>
      </div>
  )
}

export default PreviewImg