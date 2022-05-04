import React,{useEffect, useState} from 'react'

import '../../Body/Content-body/Content-body.css'
import { useSelector } from 'react-redux'
import './Content-body.css'
import DetailEnroll from '../../DetailEnroll/DetailEnroll'
import DetailUser from '../detailUser'


const EnrollContentBody =(props)=>{

    const user = useSelector(state => state.user)

    const [courseData, setCourseData] = useState()
    const [number, setNumber] = useState(0)
    const [UserData, setUserData] = useState()
    const [detailEnroll, setDetailEnroll] = useState(false)
    const [courseId, setCourseId] = useState()
    

    const [eDetail, seteDetail] = useState()
    const [eDate, seteDate] = useState()
    const [ePrice, setePrice] = useState()

    const [newData, setNewData] = useState()

    const [showProfile, setShowProfile] = useState(false)
    const [courseTeacher, setCT] = useState()

    const [detailUser , setDetailUser] = useState()

    const [status, setStatus] = useState()
    
    const [indivi, setIndivi] = useState()

    const [showDetailPur, setDetailPur] = useState(false)

    const onManageProfile =(user)=>{
        setShowProfile(true)
        
        setDetailUser(user)
    }

    const getData =async()=>{
      
        const response = await fetch(`http://localhost:5000/api/enroll`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        setCourseData(responseData.enroll)
        console.log(responseData.enroll)
        setNumber(1)
        // props.cNoSetor(1)
    }

    const getUsers =async()=>{
      
        const response = await fetch(`http://localhost:5000/api/user`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        setUserData(responseData)
        console.log(responseData)
        props.tNoSetor(responseData.existingUser.length)
    }

    const editData =(data)=>{
        setNewData(data)
    }

    const offManage =()=>{
        setDetailEnroll(false)
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
        getUsers()
    }

    const onManage =(each,date,price,status, indiv)=>{
        seteDetail(each)
        setDetailEnroll(true)
        seteDate(date)
        setePrice(price)
        setStatus(status)
        setIndivi(indiv)
    }

    const setShowManagCourse =(id)=>{
        setCourseId(id)
        setDetailEnroll(true)
    }

    const onClickPur =()=>{
        setDetailPur(true)
    }

    useEffect(()=>{
      
        getData()
        getUsers()
    },[newData])

    let data

     if(!courseData || number < 1 ){ 
        data = (
            <>
            <br/>
            <b>There aren't any enrollment yet!</b>
            <br/>
            </>
        )
    }
    else{
        data = courseData.map(each=>{
            
            return (<div key={each.id} className='detail-data enroll-col enroll-pad'>
                <div className='detail-name enroll-id'>{each.id}</div>
                    <div className='detail-date'>{each.date}</div>
                    <div className='enroll-num'>{each.buyer}</div>
                    <div className='enroll-num'>{each.totalQuantity}</div>
        <div className='enroll-num'>{each.totalPrice}</div>
                    <div onClick={()=>onManage(each.course, each.date, each.totalPrice, each.status, each)} className='enroll-num edit-but'>Detail</div>
             </div>)
        })
    }
    

        
        

    return(
        <>
        {detailEnroll !== false && <DetailEnroll getData={getData} indivi={indivi} offManage={offManage} status={status} detail={eDetail} price={ePrice} date={eDate} />}
        {showProfile && <DetailUser onClickPur={onClickPur} showDetailPur={showDetailPur} offManageProfile={offManageProfile} detailUser={detailUser} />}
 <div className='content-body'>
    
     <div className='detail-body'>
     
         <div className='detail-title'>
            Recent Courses
         </div>
         <div className='detail-column'>
         <div className='detail-data enroll-col'>
            <div className='detail-name enroll-id bold'>Enrollment ID</div>
                <div className='detail-date bold'>Date</div>
                <div className='enroll-num bold'>User</div>
                <div className='enroll-num bold'>Total Quantity</div>
                <div className='enroll-num bold'>Total Price</div>
                <div className='enroll-num bold'></div>
         </div>
         
         {data}
         </div>
     </div>
     <div className='resent-body resent-user'>
     <div className='resent-title'>Recent Users</div>
         {
             UserData && UserData.existingUser.map((each,index)=>{
                 return(
                     
                        <div key={each.id} className='resent-data'>
        <img alt='teacher' className='teacher-img'  src={`http://localhost:5000/${each.image}`} />
        <div className='teacher-data cus-data'>
            <div><b className='cus-name'>{each.name}</b></div>
        </div>
        <div className='edit-teacher' >
            <span onClick={()=>onManageProfile(each)}>Detail</span>
            
            { each.status === 'active' && <span onClick={()=>statusChangeHandler('inactive',index, each.id)}>Ban</span>}
            { each.status !== 'active' && <span onClick={()=>statusChangeHandler('active',index, each.id)}>Unban</span>}
        </div>
        </div>
                     
                 )
             })
         }
        
        
     </div>
 </div>
 </>
    )

}

export default EnrollContentBody