import React from "react";

const NotificationLoading = ({ mode }) => {
  return (
    <>
      {mode === "in-button" ? (
        <div className="in-button">
            <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="loading-con">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationLoading;

