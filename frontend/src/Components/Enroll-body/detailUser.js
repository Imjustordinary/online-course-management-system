import React, { useEffect, useRef, useState } from 'react'

import '../ManageProfile/ManageProfile.css'
import '../Auth/Auth.css'

const DetailUser =(props)=>{
  
  const [purchasedCourses, setCourses] = useState()
  console.log(purchasedCourses)
  
    const test =()=>{
      setCourses()
    }
      
  const fetchUser =async()=>{
    const response = await fetch('http://localhost:5000/api/cus/search',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer:props.detailUser.id
      })
    })
    const responseData = await response.json();
    if(!response.ok){
      throw new Error(responseData.message)
    }
    console.log(responseData.getCourse)
    setCourses(responseData.getCourse)
  }

  

  useEffect(()=>{
    fetchUser()
  },[])

  let purchasedData 
  if(purchasedCourses !== undefined && 
    purchasedCourses.length < 1 ){
      purchasedData = <span>Haven't buy any course yet! </span>
    }
  else if( purchasedCourses !== undefined && purchasedCourses.length < 2){
    purchasedData = <span onClick={()=>props.onClickPur()} className='purchased-data'>Purchased { purchasedCourses.length} course</span>
  }
  else if(purchasedCourses !== undefined && purchasedCourses.length > 1){
    purchasedData = <span onClick={()=>props.onClickPur()} className='purchased-data'>Purchased { purchasedCourses.length} courses</span>
    
  }

  let detailPurchased
  if(props.showDetailPur !== false){
  detailPurchased = purchasedCourses.map((each)=>{
     return(
      <div key={each.id} className='each-detail-pur-pro'>
                <div >
                <img className='each-detail-pur-pro-img' src={`http://localhost:5000/${each.image}`} />
                </div>
                <div className='each-detail-pur-info'>
                <span className='each-detail-pur-name'> <b>{each.name}</b> </span> 
                <span style={{color:'grey'}}><b>${each.price}</b></span>
                </div>
                </div>
    )
  })
}
    return(
        <>
        {purchasedCourses !== undefined && 
       <>
        <div onClick={()=>props.offManageProfile()} className='black-sheed'></div>
        <div className='manage-profilebox remove-r-profile profile-size'>
            <div className='manage-profile-title'>Detail profile</div>
            <div>

            <div className='manage-image'><img src={`http://localhost:5000/${props.detailUser.image}`} className='profile-img' /></div>
            <div className='each-input ' style={{margin:'15px 0'}}>
            <span>Name : </span>
            <span className='each-larger'>{props.detailUser.name}</span>
            </div>
            <div className='each-input ' style={{margin:'15px 0'}}>
            <span>Email : </span>
            
            <span className='each-larger'>{props.detailUser.email}</span>
            </div>
            <div className='each-input each-larger'>
            {
            purchasedData  
            }
            
            </div>
            {props.showDetailPur !== false &&            
            <div className='detail-pur-pro'>
              
            {detailPurchased}    
            </div>
            }
            </div>
        </div>
       </>
}
        </>
    )
}

export default DetailUser