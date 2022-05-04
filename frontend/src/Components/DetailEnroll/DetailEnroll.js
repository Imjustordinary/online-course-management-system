import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import '../ManageProfile/ManageProfile.css'
import '../Auth/Auth.css'
import './DetailEnroll.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'
import Loading from '../Loading/Loading'

const DetailEnroll =(props)=>{
    
    const [approved, setApproved] = useState(false)

    console.log(props.detail)
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    const showCleaner =()=>{
      props.offManage()
  }

  const addDeliHandler =async()=>{
    try {
        const response = await fetch('http://localhost:5000/api/deli', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           buyer:props.indivi.buyer,
           date:date,
           totalPrice:props.price,
           enrollment:props.indivi.id,
           address:props.indivi.address,
           phoneNumber:props.indivi.phoneNumber
          })

          
        });


        const responseTwo = await fetch(`http://localhost:5000/api/enroll/${props.indivi.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             status:'approved'
            })
  
            
          });
  
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message)
        }

        const responseDataTwo = await responseTwo.json();
        if(!response.ok){
          throw new Error(responseDataTwo.message)
        }
        
        
        console.log(responseDataTwo)
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

        body = props.detail.map(each=>{
            return(
                <div key={each.course.id} className='each-detail-enroll-item'>
                <div className='each-detail-enroll-item-title'>{each.course.name}</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title'>${each.course.price}</div>
            </div>
            )
        })

    return(
        <>
       <>
        <div onClick={()=>props.offManage()} className='black-sheed'></div>
        <div className='manage-profilebox profile-size chg-font'>
            <div className='manage-profile-title'>Enroll Detail</div>
            <div className='purchased-date'>Purchased: {props.date}</div>
            {
                body
            }
            <div className='each-detail-enroll-item subto-box'>
                <div className='each-detail-enroll-item-title subto'>Subtotal</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>${+props.price - 2}</div>
            </div>
            <div className='each-detail-enroll-item detail-enroll-deli'>
                <div className='each-detail-enroll-item-title subto'>Delivery fees</div>
                <span>-</span>
                <div className='each-detail-enroll-item-title sub-price'>$2</div>
            </div>
            <div className='detail-enroll-total-price'>
                <div className='to'>Total</div>
                <span>-</span>
                <div className='to-price'>${props.price}</div>
            </div>
            <div>
                {
                    props.status !== 'pending'|| approved === true? <button className="button-18 but-dis" role="button">Already added to delivery</button>:
                    <button onClick={addDeliHandler} className="button-18" role="button">Add to delivery</button>
                }
           

            </div>
        </div>
       </>
       
        </>
    )
}

export default DetailEnroll