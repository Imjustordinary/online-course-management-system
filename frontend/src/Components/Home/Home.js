import React, { useEffect, useState, useRef } from "react";

import './Home.css'
import PopularCourse from "./PopularCourse/PopularCourse"

const Home =(props)=>{

    const [staffData, setStaffData] = useState()


    const getStaff =async()=>{
      
        const response = await fetch(`http://localhost:5000/api/staff/`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        setStaffData(responseData)
    }

    useEffect(() => {
        getStaff();
      }, []);

   
    return(
        <>
            <div className="home-container">
                <div className="home-display">
                    <div className="home-header">Learn without limits</div>
                    <div className="home-para">Get that "ready for anything" feeling with many courses by world-class professors and professionals from Technology and Business field. The sky's the limit! </div>
                    
                    <div onClick={()=>props.pathChanger("display")} className="body">
  <span className="span"><span className="a"></span></span>
</div>
                </div>
                <div className="home-logo">
                <img className="home-logo-img" src="./Images/watching-logo.svg" />
                </div>
            </div>
           

<div className="up-container">
    <img className="black-logo" src="./Images/logo-black.png" />
    <div className="up-title">offers the most comprehensive and up-to-date learning resources on <br/>Technology & Business.</div>
    <div className="up-para">From the very basics up to advanced topics and real projects - we got you covered! And we'll give you <br/>course completion certificates to prove your progress to others!</div>
</div>
<div>
    <PopularCourse eachCourseSelect ={props.eachCourseSelect}/>
</div>
<div className="commu-contianer">
            <div className="commu-body">
                <div className="community-header">From DKM community</div>
                <div className="community-title">Many people are already learning on DKM</div>
                <div className="staff-community">
                
                {
                    staffData && staffData.staff.slice(0, 3).map(each=>{
                        return(
                            <div className="each-staff-commu" key={each.id}>
                    <div className="staff-commu-img"><img className="staff-commu-image" src={`http://localhost:5000/${each.image}`} /></div>
                    <div className="staff-commu-body">
                        <div className="staff-commu-name">{each.name}</div>
                        <div className="staff-commu-depart">{each.department}</div>
                        <div className="line"></div>
                        <div className="staff-commu-words">{each.description}</div>
                    </div>
                </div>
                        )
                })
                }
                </div>
            </div>
</div>
        </>
    )
}

export default Home