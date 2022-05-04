import React, { useEffect, useState, useRef } from "react";

import "../../CourseDisplay/CourseDisplay.css";
import "./PopularCourse.css";

const PopularCourse =(props)=>{
    const [courses, setCourses] = useState();
    const getCourses = async () => {
        const response = await fetch(`http://localhost:5000/api/course/`, {
          method: "GET",
        });
        const responseData = await response.json();
    
        
        setCourses(responseData.course.slice(0, 3));
      };

let displayCourse;
if(courses && courses.length > 0){
displayCourse = courses.map((each) => {
    
    return(<div key={each.id} className="border-box-two" onClick={()=>props.eachCourseSelect(each)}>
        <div className="course-display-box">
        <img
            className="course-image-display"
            src={`http://localhost:5000/${each.image}`}
            alt=""
        />
        </div>
        <div className="course-description">
        <h3 className="course-title-info">{each.name}</h3>
        <p className="course-description-info">{each.description}</p>
        <br />
        <div className="course-price-info">
            <div className="course-teacher-info">
            <img className="course-teacher-image" src={`http://localhost:5000/${each.creator.image}`} />
            {each.creator.name}
            </div>
            <div className="price-info">$ {each.price}</div>
        </div>
        </div>
    </div>)
    
});
}

useEffect(() => {
    getCourses();
  }, []);
    
return(
    <>
    <div className="some-popu-title">Some popular courses</div>
    <div className="gallery-two">
        {displayCourse}
        
      </div>
      </>
)
}

export default PopularCourse