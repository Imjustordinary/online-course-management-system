import React, { useEffect, useState, useRef } from "react";

import "./CourseDisplay.css";
import "./DropdownBox.css"

const CourseDisplay = (props) => {
  const [courses, setCourses] = useState();
  const cateSelectedOption = useRef()

  const getCourses = async () => {
    const response = await fetch(`http://localhost:5000/api/course/`, {
      method: "GET",
    });
    const responseData = await response.json();

    
    setCourses(responseData.course);
  };

  const filterHandler =async(value)=>{
    if(value === "All"){
      const response = await fetch(`http://localhost:5000/api/course/`, {
        method: "GET",
      });
      const responseData = await response.json();
  
      
      setCourses(responseData.course);
    }
    else{
    const response = await fetch(`http://localhost:5000/api/course/filter/${value}`, {
      method: "GET",
    });
    const responseData = await response.json();
    setCourses(responseData.course)
  }
}

  useEffect(() => {
    getCourses();
  }, []);

  

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
else if(courses && courses.length < 1){
displayCourse = <div className="empty-course">
 😓 There aren't any course yet!
</div>
}


  return (
    <>
      <h2 className="center-title">Course gallery</h2>
      <div className="select-box">
      <select onChange={()=>filterHandler(cateSelectedOption.current.value)} className="dropbox-cate" ref={cateSelectedOption}>
      <option value="All">All</option>
                <option value="Network">Network</option>
                <option value="Web development">Web development</option>
                <option value="Photography">Photography</option>
                <option value="Business">Business</option>
                <option value="Software development">
                  Software development
                </option>
              </select>
      </div>
      <div className="gallery-two">
        {displayCourse}
        
      </div>
    </>
  );
};

export default CourseDisplay;
