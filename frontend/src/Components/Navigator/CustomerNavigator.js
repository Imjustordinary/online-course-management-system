import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Navigator.css'

const CustomerNavigator =(props)=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user);

    const logOut =()=>{
        dispatch({ type: "clear-user"});
        dispatch({type: "clear-item"})
        navigate('/login')
    }

    return(
        <React.Fragment>
            <div className='navi-box'>
        <div className='container-navi cus-navi'>
        <div onClick={()=>props.pathChanger('home')} className='DKM-logo-box'>
        <img className='DKM-logo' src='./Images/DKM-logo.png' />    
        </div>
        
        <div className='profile-shower'>
            <div onClick={()=>props.pathChanger('home')} className='each-cus-navi'>What is DKM?</div>
            <div onClick={()=>props.pathChanger('display')} className='each-cus-navi'>All course</div>
            <div onClick={()=>props.pathChanger('shopping')} className='each-cus-navi'>
            <i className="fa-solid fa-cart-shopping"></i>
            </div>
            {user.id?
            <>
            <div onClick={()=>props.pathChanger('enroll-display')} className='each-cus-navi'>Enrolled courses</div>
            <div><img className='profile-img' src={`http://localhost:5000/${user.image}`} /></div>
            <div style={{marginLeft:"5px"}} onClick={()=>props.onManageProfile()} className='each-cus-navi'>Manage profile</div>
            <div onClick={logOut} className='each-cus-navi'>Log Out</div>
            </>
            :
            <div onClick={()=>navigate('/login')} className='each-cus-navi'>Login</div>
            }
        </div>
        
        </div>
        </div>
        </React.Fragment>
    )
}

export default CustomerNavigator