import React from "react";
import ReactPlayer from "react-player";
import DownloadLink from "react-download-link";

import './EnrollCourseDetail.css'

const EnrollCourseDetail =(props)=>{
console.log(props.enrollCourse)
return(
    <>
    <div className="purchased-course-container">
        <div className="left-purchsed-c">
            <div className="left-image-box"><img className="left-image" src={`http://localhost:5000/${props.enrollCourse.image}`} /></div>
            <div className="left-title">{props.enrollCourse.name}</div>

        </div>
        <div className="right-purchsed-c">
            <div className="title-download-container">
            <span className="right-title-box"><i className="fa-solid fa-video fa-2xl"></i><span className="right-title"> {props.enrollCourse.name}</span></span>
            
            </div>
            <div className="purchased-course-display">
            
            <ReactPlayer
          controls
          width="100%"
          height="500px"
          url={`http://localhost:5000/${props.enrollCourse.course}`}
          style={{ padding:"10px", marginTop:"30px", margin:"auto"}}
        />
             </div>
             <DownloadLink
             label="Save to disk"
    filename={`http://localhost:5000/${props.enrollCourse.course}`}
    exportFile={() => "My cached data"}                                           
/>
                                                    


         </div>
     </div>
     </>
)
}

export default EnrollCourseDetail