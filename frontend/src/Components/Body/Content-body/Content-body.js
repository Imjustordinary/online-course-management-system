import React,{useEffect, useState, useCallback} from 'react'

import './Content-body.css'
import { useSelector } from 'react-redux'
import ManageCourse from '../../ManageCourse/ManageCourse'
import ManageProfile from '../../ManageProfile/ManageProfile'

const ContentBody =(props)=>{

    const user = useSelector(state => state.user)

    const [run, setRun] = useState(false)

    const [courseData, setCourseData] = useState()
    const [number, setNumber] = useState(0)
    const [staffData, setStaffData] = useState()
    const [detailCourse, setDetailCourse] = useState(false)
    const [courseId, setCourseId] = useState()
    const [loading, setLoading] = useState(true)
    
    const [newData, setNewData] = useState()

    const [showProfile, setShowProfile] = useState(false)
    const [courseTeacher, setCT] = useState()

    const offManageProfile =()=>{
        setShowProfile(false)
    }

    const onManageProfile =(user)=>{
        setShowProfile(true)
        setCT(user)
    }

    const getData =async()=>{
      setLoading(true)
        const response = await fetch(`http://localhost:5000/api/course/`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        setCourseData(responseData)
        
        setNumber(responseData.course.length)
        props.cNoSetor(responseData.course.length)
        setLoading(false)
    }

    const getStaff =async()=>{
      
        const response = await fetch(`http://localhost:5000/api/staff/`, {
        method: 'GET'})
        const responseData = await response.json();
        
        
        setStaffData(responseData)
        props.tNoSetor(responseData.staff.length)
    }

    const editData =(data)=>{
        setNewData(data)
    }

    const offManage =()=>{
        setDetailCourse(false)
    }

    const setShowManagCourse =(id)=>{
        setCourseId(id)
        setDetailCourse(true)
    }


    const statusChangeHandler = async (status,id)=>{
        try{
            const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  status:status
              })
            });
            
            const responseData = await response.json();
            console.log(responseData);
            setRun((prev)=>!prev)
            props.showCleanerStart()
            if(!response.ok){
                throw new Error(responseData.message)
              }
              
        }
        catch(err){
    
        }
    }

    useEffect(()=>{
      
        getData()
        getStaff()
    },[newData, run])

    let data
    let nth

     if(loading !== true && number < 1 ){ 
        data = (
            <>
            <br/>
            <b>There aren't any courses yet!</b>
            <br/>
            </>
        )
    }
    else if(courseData){
        data = courseData.course.map(each=>{
            
            return (<div key={each.id} className='detail-data'>
                
             <div className='detail-name'><img alt='teacher' className='course-img-sta'  src={`http://localhost:5000/${each.image}`}/></div>
                    <div className='detail-name'>{each.name}</div>
                    <div className='detail-date'>{each.date}</div>
                    <div className='detail-creator'>{each.creator.name}</div>
                    <div className='detail-creator'>{each.price}</div>
                    <div onClick={()=>setShowManagCourse(each.id)} className='detail-creator edit-but'>Edit</div>
             </div>)
        })
    }
    

        
        

    return(
        
 <div className='content-body'>
     
     {detailCourse&&<ManageCourse id={courseId} offManage={offManage} onUpdate={props.onUpdate} editData={editData}/>}
     {showProfile && <ManageProfile run={run} setRun = {setRun} user={courseTeacher} offManageProfile={offManageProfile} />}
     <div className='detail-body'>
     
         <div className='detail-title'>
            Recent Courses
         </div>
         <div className='detail-column'>
         <div className='detail-data'>
            <div className='detail-name bold'>Image</div>
                <div className='detail-name bold'>Name</div>
                <div className='detail-date bold'>Date</div>
                <div className='detail-creator bold'>Creator</div>
                <div className='detail-creator bold'>Pricing</div>
                <div className='detail-creator bold'></div>
         </div>
         
         {data}
         </div>
     </div>
     <div className='resent-body'>
     <div className='resent-title'>Recent Course teacher</div>
         {
             staffData && staffData.staff.map(each=>{
                 return(
                     <div key={each.id}>
                        <div className='resent-data'>
                            <div className='teacher-img-box'>
        <img alt='teacher' className='teacher-img'  src={`http://localhost:5000/${each.image}`} />
        {
            each.status === 'active' ?<div className='status-staff'></div>:<div className='status-staff inactive'></div>}
        </div>
        <div className='teacher-data'>
            <div><b className='staff-font'>{each.name}
            {each.role === 'admin' && <span className='admin-teacher staff-font'>(Admin)</span>}
            </b>
            </div>
            <div>{each.department}</div>
            <div className='creation'>{each.courses.length < 2 ? `${each.courses.length} course created`:`${each.courses.length} courses created`}</div>
        </div>
        {user.role!=='course teacher'&&<div className='edit-teacher' >
            <span onClick={()=>onManageProfile(each)}>Edit</span>
            
            {each.role !== 'admin' && each.status === 'active' && <span onClick={()=>statusChangeHandler('inactive',each.id)}>Deactivate</span>}
            {each.role !== 'admin' && each.status !== 'active' && <span onClick={()=>statusChangeHandler('active',each.id)}>Activate</span>}
            {each.role === 'admin' && <span></span>}
        </div>}
        </div>
                     </div>
                 )
             })
         }
        
        
     </div>
 </div>
    )

}

export default ContentBody