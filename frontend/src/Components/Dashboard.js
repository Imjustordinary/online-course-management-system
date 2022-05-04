import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from 'react-redux'

import Heading from './Heading/Heading'
import Body from './Body/Body'
import Navigator from './Navigator/Navigator'
import RegisterBody from './Register-body/Register-body'
import RegisterCourse from './Register-course/Register-course'
import './Dashboard.css'
import ManageProfile from './ManageProfile/ManageProfile'
import { useNavigate } from 'react-router-dom'
import CourseDisplay from './CourseDisplay/CourseDisplay'
import EnrollBody from './Enroll-body/EnrollBody'
import ErrorDisplay from './ErrorDisplay/ErrorDisplay'
import DeliBody from './Delivery-body/DeliBody'

const Dashboard =()=>{

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [pathname, setPathname] = useState('register-course')

    const [showProfile, setShowProfile] = useState(false)

    const [courseNo, setCourseNo] = useState('')
    const [teacherNo, setTeacherNo] = useState('')

    const [showError, setShowError] = useState(false)

    const errorCleaner =()=>{
        setShowError(true)
    }

    const cNoSetor =(no)=>{
        setCourseNo(no)
    }

    const tNoSetor =(no)=>{
        setTeacherNo(no)
    }

    const pathChanger =(namePath)=>{
        setPathname(namePath)
    }
    
    const incrementHandler =()=>{
        
        console.log(user)
    }

    const onManageProfile =()=>{
        setShowProfile(true)
    }

    const offManageProfile=()=>{
        setShowProfile(false)
    }
    
    useEffect(()=>{
        if(!user.id){
            navigate('/staff/login')
            dispatch({type:'kick-out'})
        }
        
    },[])

    let body
    if(pathname === 'register-course'){
        body = (
            <RegisterCourse pathChanger={pathChanger} />
        )
    }
    if(pathname === 'statistics'){
        body = (
            <Body onUpdate={pathChanger} courseNo={courseNo} teacherNo={teacherNo} cNoSetor={cNoSetor} tNoSetor={tNoSetor} />
        )
    }
    if(pathname === 'register-course-teacher'){
        body =(
            <RegisterBody />
        )
    }
    if(pathname === 'statistic-enroll'){
        body =(
            <EnrollBody courseNo={courseNo} teacherNo={teacherNo} cNoSetor={cNoSetor} tNoSetor={tNoSetor} />
        )
    }
    if(pathname === 'statistic-deli'){
        body =(
            <DeliBody  />
        )
    }

    return(
        <React.Fragment>
            
            {showProfile && <ManageProfile user={user} offManageProfile={offManageProfile} />}
            <div className='container'>
                <Navigator image={user.image} name={user.name} status={user.status} />
                <div className='body-container'>
               <Heading onManageProfile={onManageProfile} path={pathname} user={user} pathChanger={pathChanger} />
                {
                    body
                }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard
