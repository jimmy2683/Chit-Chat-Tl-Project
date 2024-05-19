import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function notifications(){
    return(<div className="Notifications">
        <ToastContainer position="bottom-right"/>
    </div>)
}

export default notifications;