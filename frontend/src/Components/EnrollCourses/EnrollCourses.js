import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../CourseDisplay/CourseDisplay.css";
import Loading from "../Loading/Loading";

const EnrollDisplay = (props) => {

    const user = useSelector(state => state.user)

  const [enrolledCourses, setenrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  
   const getEnrollCourses = async()=>{
    setLoading(true)
        try{
            const response = await fetch('http://localhost:5000/api/cus/search',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                customer:user.id
              })
            })
            const responseData = await response.json();
            if(!response.ok){
              throw new Error(responseData.message)
            }
            setenrolledCourses(responseData.getCourse)
            setLoading(false)
          }
          catch(err){
            console.log(err.message)
            setLoading(false)
          }
    }
  
 

  useEffect(() => {
    getEnrollCourses();
  }, []);

  

  let displayCourse;
  if(enrolledCourses.length > 0){
  displayCourse = enrolledCourses.map((each) => {
    
      return(<div key={each.id} className="border-box-two" onClick={()=>props.enrollCourseSelect(each)}>
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
          
        </div>
      </div>)
    
  });
}
else{
    displayCourse = <div className="no-item">
    😓
    <br/>
    There aren't any purchased courses yet!
    </div>
}


  return (
    <>
    {
        <Loading loading={loading} />
    }
      <h2 className="center-title">Your enrolled course gallery</h2>
      <div className="gallery-two">
        {loading=== false &&displayCourse}
        
      </div>
    </>
  );
};

export default EnrollDisplay;
