import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import '../ManageProfile/ManageProfile.css'
import '../Auth/Auth.css'
import '../DetailEnroll/DetailEnroll.css'
import './DetailDelivery.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'
import Loading from '../Loading/Loading'

const DetailDeli =(props)=>{
    
    const [approved, setApproved] = useState(false)
    
    console.log(props.detailDeliData)
    const showCleaner =()=>{
      props.offManage()
  }

  const deleteHandler =async ()=>{
    const response = await fetch(`http://localhost:5000/api/deli/${props.detailDeliData.id}`, {
      method: "DELETE",
    });
    
    props.getData()
    props.offManage()
  }

  const addDeliHandler =async()=>{
    try {
        
  
        
        
        
        // props.endLoading()
        // props.showSuc()
        setApproved(true)
        props.getData()
      } catch (err) {
        console.log(err.message)
        // props.endLoading()
      }
  }

  let body
  body = props.detailDeliData.books.map((each, index)=>{
          return(
            props.detailDeliData.books.length - 1 === index?<span key={each}> {each} <br/></span>: <span key={each}> {each},  <br/></span>
          )
  })
        

    return(
        <>
       <>
        <div onClick={()=>props.offManage()} className='black-sheed'></div>
        <div className='manage-profilebox profile-size chg-font'>
            <div className='manage-profile-title'>Delivery Detail</div>
            <div className='purchased-date'>Added date: {props.detailDeliData.date}</div>
            
            <div className='each-detail-enroll-item subto-box-deli'>
                <div className='each-detail-enroll-item-title subto '>Enrollment ID</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price '>{props.detailDeliData.enrollment}</div>
            </div>
            <div className='each-detail-enroll-item detail-enroll-deli'>
                <div className='each-detail-enroll-item-title subto'>User</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>{props.detailDeliData.buyer}</div>
                
            </div>
            <div className='each-detail-enroll-item detail-enroll-deli'>
                <div className='each-detail-enroll-item-title subto'>Books</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>
                {body}
                </div>
                
            </div>
            <div className='each-detail-enroll-item detail-enroll-deli'>
                <div className='each-detail-enroll-item-title subto'>Address</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>{props.detailDeliData.address}</div>
                
            </div>
            <div className='each-detail-enroll-item detail-enroll-deli'>
                <div className='each-detail-enroll-item-title subto'>Phone Number</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>{props.detailDeliData.phoneNumber}</div>
                
            </div>
           <div>
               <span onClick={deleteHandler} className='delete-deli'>
                   Delete this delivery
               </span>
           </div>
            
        </div>
       </>
       
        </>
    )
}

export default DetailDeli