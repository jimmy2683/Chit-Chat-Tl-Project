import React, { useEffect, useRef, useState } from "react";
import "./lists.css";
import img1 from "../../../../assets/img1.jpeg";
function lists() {

  return (
    <div className="Lists">
      <div className="scroll">
        <div className="item">
          <img src={img1} alt="avatar1" />
          <div className="Details">
            <div className="UserName">Jimmy</div>
            <div className="lastmessage">Kon hai tu</div>
          </div>
        </div>
        <div className="item">
          <img src={img1} alt="avatar1" />
          <div className="Details">
            <div className="UserName">Jimmy</div>
            <div className="lastmessage">Kon hai tu</div>
          </div>
        </div>
        <div className="item">
          <img src={img1} alt="avatar1" />
          <div className="Details">
            <div className="UserName">Jimmy</div>
            <div className="lastmessage">Kon hai tu</div>
          </div>
        </div>
        <div className="item">
          <img src={img1} alt="avatar1" />
          <div className="Details">
            <div className="UserName">Jimmy</div>
            <div className="lastmessage">Kon hai tu</div>
          </div>
        </div>
        <div className="item">
          <img src={img1} alt="avatar1" />
          <div className="Details">
            <div className="UserName">Jimmy</div>
            <div className="lastmessage">Kon hai tu</div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default lists;
