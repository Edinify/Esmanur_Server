import React from "react"
import "./loadingBox.css"

const LoadingBox = () => {
  return (
    <div className="loading-box">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingBox;
