import React from "react";
import "./details.css";
import img1 from "../../../assets/img1.jpeg";

function details() {
  return (
    <div className="Details">
      <div className="UserDetail">
        <img src={img1} />
        <div className="userName">Jimmy</div>
        <div className="description">
          I am very busy please call me later or drop message I can see later.
        </div>
      </div>
      <div className="block">Block!</div>
    </div>
  );
}
export default details;
