import React from "react";


const Loading = ({ mode }) => {
  return (
    <>
      {mode === "in-button" ? (
        <div className="in-button">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="loading-main-container">
          <div className="loading-content">
            <div className="loading-con">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <p>Yüklənir...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
