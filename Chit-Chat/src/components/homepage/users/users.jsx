import React, { useEffect, useRef, useState } from "react";
import './users.css'
import Lists from './lists/lists'
import Adduser from "./lists/adduser/adduser"
import img1 from "../../../assets/abstract-background-with-colorful-and-modern-style-vector.jpg"
import profileicon1 from "../../../assets/profile/icon1.svg"
import profileicon2 from "../../../assets/profile/icon2.svg"
import profileicon3 from "../../../assets/profile/icon3.svg"
import profileicon4 from "../../../assets/profile/icon4.svg"
import profileicon5 from "../../../assets/profile/icon5.svg"
import profileicon6 from "../../../assets/profile/icon6.svg"
import searchicon from "../../../assets/search/icon1.svg"
function users(){

    const [addMode,setAddMode]= useState(false);

    return (
        <div className="Users">
            <div className="profile">
                <img src={img1} alt="avatar1"/>
                
                <div className="icons">
                    <img src={profileicon1}/>
                    <img src={profileicon2}/>
                    <img src={profileicon3}/>
                    <img src={addMode ? profileicon6 :profileicon4} className="Add" onClick={()=> setAddMode((prev)=>!prev)}/>
                    <img src={profileicon5}/>
                    
                </div>
            </div>
            <div className="search">
                <img src={searchicon}/>
                <input type="text" placeholder="Search contacts"/>
            </div>
            <Lists/>
            {addMode && <Adduser/>}
        </div>
    )
}
export default users