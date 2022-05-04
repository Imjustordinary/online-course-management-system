import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from 'react-redux'

import CustomerNavigator from '../Navigator/CustomerNavigator'
import '../Dashboard.css'
import './CustomerDashboard.css'
import CusManageProfile from '../ManageProfile/CustomerManageProfile'
import { useNavigate } from 'react-router-dom'
import CourseDisplay from '../CourseDisplay/CourseDisplay'
import CourseDetail from '../CourseDetail/CourseDetail'
import ShoppingCard from '../ShoppingCard/ShoppingCard'
import Auth from '../Auth/Auth'
import EnrollDisplay from '../EnrollCourses/EnrollCourses'
import EnrollCourseDetail from '../EnrollCourseDetail/EnrollCourseDetail'
import Home from '../Home/Home'

const CustomerDashboard =()=>{

    const [eachCourse, setEachCourse] = useState()
    const [enrollCourse, setEnrollCourse] = useState()

  const eachCourseSelect =(each)=> {
    setEachCourse(each)
    pathChanger('detail')
  }

  const enrollCourseSelect =(each)=>{
    setEnrollCourse(each)
    pathChanger('detail-enroll')
  }

    const user = useSelector(state => state.user)
    

    const navigate = useNavigate()

    const [pathname, setPathname] = useState('home')

    const [showProfile, setShowProfile] = useState(false)



    const pathChanger =(namePath)=>{
        setPathname(namePath)
        console.log('path change')
    }

    const onManageProfile =()=>{
        setShowProfile(true)
    }

    const offManageProfile=()=>{
        setShowProfile(false)
    }

    useEffect(()=>{

    },[pathChanger])
    

    let body
    if(pathname === 'display'){
        body = (
            <CourseDisplay eachCourseSelect={eachCourseSelect} />
        )
    }
    else if(pathname === 'detail'){
        body = (
            <CourseDetail eachCourse={eachCourse} />
        )
    }
    else if(pathname === 'shopping'){
        body = (
            <ShoppingCard pathChanger={pathChanger} />
        )
    }
    else if(pathname === 'login'){
        body = (
            <Auth />
        )
    }
    else if(pathname === 'enroll-display'){
        body = (
            <EnrollDisplay enrollCourseSelect={enrollCourseSelect} />
        )
    }
    else if(pathname === 'detail-enroll'){
        body = (
             <EnrollCourseDetail enrollCourse={enrollCourse} />
        )
    }
    else if(pathname === 'home'){
        body = (
             <Home eachCourseSelect={eachCourseSelect} pathChanger={pathChanger} />
        )
    }

    return(
        <React.Fragment>
            {showProfile && <CusManageProfile offManageProfile={offManageProfile} />}
            <div className='full-body'>
            <div className='container'>
                <CustomerNavigator pathChanger={pathChanger} onManageProfile={onManageProfile} image={user.image} name={user.name} />
                {body}
            </div>
            <div className='footer'>© DKM 2022</div>
            </div>
        </React.Fragment>
    )
}

export default CustomerDashboard
