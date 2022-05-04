import React,{useEffect, useState} from 'react'

import '../../Body/Content-body/Content-body.css'
import { useSelector } from 'react-redux'
import './Content-body.css'
import DetailDeli from '../../DetailDelivery/DetailDelivery'


const DeliContentBody =(props)=>{

    const user = useSelector(state => state.user)

    const [number, setNumber] = useState(0)
    const [detailDeli, setdetailDeli] = useState(false)
    const [detailDeliData, setDetailDeliData] = useState()

    
    const [deli, setDeli] = useState()
    

  
    const [showProfile, setShowProfile] = useState(false)
    

    const [detailUser , setDetailUser] = useState()

    const [status, setStatus] = useState()
    
    const [indivi, setIndivi] = useState()

    const [showDetailPur, setDetailPur] = useState(false)

    const onManageProfile =(user)=>{
        setShowProfile(true)
        
        setDetailUser(user)
    }

    const getData =async()=>{
      
        const response = await fetch(`http://localhost:5000/api/deli`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        console.log(responseData.deli)
        setDeli(responseData.deli)
        setNumber(responseData.deli.length)
       
    }

    

   
    const offManage =()=>{
        setdetailDeli(false)
    }

    const offManageProfile =()=>{
        setShowProfile(false)
        setDetailPur(false)
    }

    const statusChangeHandler =async(state,index,id)=>{
        
        const response = await fetch(`http://localhost:5000/api/user/control/${id}`, {
        method: 'GET'})
        const responseData = await response.json();
        console.log(responseData)
        
    }

    const onManage =(each)=>{
        setdetailDeli(true)
        setDetailDeliData(each)
    }

    const setShowManagCourse =(id)=>{
        
        setdetailDeli(true)
    }

    const onClickPur =()=>{
        setDetailPur(true)
    }

    useEffect(()=>{
      
        getData()
    },[])

    let data

     if(!deli || number < 1 ){ 
        data = (
            <>
            <br/>
            <b>There aren't any delivery yet!</b>
            <br/>
            </>
        )
    }
    else{
        data = deli.map(each=>{
            
            return (<div key={each.id} className='detail-data enroll-col enroll-pad'>
                <div className='detail-name enroll-id'>{each.enrollment}</div>
                    <div className='detail-date'>{each.date}</div>
                    <div className='enroll-id'>{each.totalQuantity}</div>
                    <div className='enroll-num'>{each.buyer}</div>
        <div className='enroll-num'>{each.address}</div>
        <div className='enroll-num'>{each.phoneNumber}</div>
                    <div onClick={()=>onManage(each)} className='enroll-num edit-but'>Detail</div>
             </div>)
        })
    }
    

        
        

    return(
        <>
        {detailDeli !== false && <DetailDeli getData={getData} offManage={offManage} detailDeliData={detailDeliData} />}
        {/* {showProfile && <DetailUser onClickPur={onClickPur} showDetailPur={showDetailPur} offManageProfile={offManageProfile} detailUser={detailUser} />} */}
 <div className='content-body'>
    
     <div className='detail-body'>
     
         <div className='detail-title'>
            Recent Delivery
         </div>
         <div className='detail-column'>
         <div className='detail-data enroll-col'>
            <div className='detail-name enroll-id bold'>Enrollment ID</div>
                <div className='detail-date bold'>Added date</div>
                <div className='enroll-id bold'>Total Quantity</div>
                <div className='enroll-num bold'>User</div>
                <div className='enroll-num bold'>Address</div>
                <div className='enroll-num bold'>Phone</div>
                <div className='enroll-num bold'></div>
         </div>
         
         {data}
         </div>
     </div>
    
 </div>
 </>
    )

}

export default DeliContentBody