import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch,useSelector } from "react-redux";

import "./CourseDetail.css";

const CourseDetail = (props) => {

  const cart = useSelector(state => state.cart)
  
const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const [detailCourse, setDetailCourse] = useState()
  const [addedCourse, setAddedCourse] = useState(false)
  const [showAlreadyPurchased,setShowAlreadyPurchased] = useState(false)
  const [loading, setLoading] = useState(true)

  
  
  let books = props.eachCourse.books.map((each,id)=>
  {if(id+1 < props.eachCourse.books.length)
  {
  return each+', '
}
 return each})

 const addItemController = ()=>{
  dispatch({type:'add-item',payload:{detailCourse}})
  
  setAddedCourse(true)
  
}

const validator =()=>{
  cart.map(each=> {
    if(each.course.id === props.eachCourse.id){
      setAddedCourse(true)
    }
    })
}

useEffect(()=>{
  validator()
},[])

const purchasedCourseHandler =async()=>{
  setLoading(true)
  
  if(user.id){
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
    let purchasedCourses
    purchasedCourses= responseData.getCourse
    purchasedCourses.map(each=>{
      if(each.id === props.eachCourse.id){
        
        setShowAlreadyPurchased(true)
      }
    })
    setLoading(false)
  }
  catch(err){
    console.log(err.message)
  }
}
else{
setLoading(false)
}
}

useEffect(()=>{
  setDetailCourse(props.eachCourse)
  purchasedCourseHandler()
},[])

let addtoCardBut
let guanranteeText
if(addedCourse){
  addtoCardBut = <div className="each-detail-enroll-button shop-cart disable">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            <span className="enroll-title">Already in the cart</span>
          </div>;
  guanranteeText = <span className="guaran">😇 The course books are guaranteed to be delivered just in 3 days after buying the course!</span>

}
else if(showAlreadyPurchased){
  addtoCardBut = <div onClick={addItemController} className="each-detail-enroll-button but-hov shop-cart disable">
  <i className="fa-solid fa-cart-shopping fa-lg"></i>
  <span className="enroll-title">Already purchased</span>
</div>;
      
}
else{
  addtoCardBut = <div onClick={addItemController} className="each-detail-enroll-button but-hov shop-cart">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            <span className="enroll-title">Add to cart</span>
          </div>;
  guanranteeText = <span className="guaran">😇 The course books are guaranteed to be delivered just in 3 days after buying the course!</span>

}







  return (
    <>
      <div className="each-detail-container" >
        <img className="each-detail-course-img" src={`http://localhost:5000/${props.eachCourse.image}`} />
        <div className="background-delay"></div>
        <div className="each-detail">
          <h1 className="each-detail-title">{props.eachCourse.name}</h1>
          <div className="each-detail-description">
          {props.eachCourse.description}
          </div>
          <div className="two-entroll-but">
         
          {
            loading === false &&addtoCardBut
          }
          
          </div>
        </div>
      </div>
      <div className="preview-title">Course preview</div>
      <div>
        <ReactPlayer
          controls
          url={`http://localhost:5000/${props.eachCourse.preview}`}
          style={{ margin: "auto", padding:"10px"}}
        />
      </div>
      <br />
      <div className="info-box">
      <span className="span">Course Information :</span>
      <div className="each-detail-info">
        <ul>
          <li>This course is for {props.eachCourse.type}</li>
          <li>This video course from {props.eachCourse.category} category</li>
          <li>This course come with { books} books</li>
          
        </ul>
      </div>
      </div>
      {
        guanranteeText
      }
      <div className="each-instructor">
        <div className="instructor-container">
          <div className="instructor-title">Your instructor</div>
          <div className="instructor-data">
            <div className="instructor-profile">
              <div>
                <img
                  className="instructor-img"
                  src={`http://localhost:5000/${props.eachCourse.creator.image}`}/>
              </div>
              <div className="instructor-name">{props.eachCourse.creator.name}</div>
            </div>

            <div className="instructor-personal-data">
              {props.eachCourse.creator.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
