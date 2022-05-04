import React from 'react'

import './Navigator.css'
import '../Body/Content-body/Content-body.css'

const Navigator =(props)=>{
    return(
        <React.Fragment>
            <div className='navi-box-container'>
        <div className='container-navi'>
        <div className='DKM-logo-box'>
            <img className='DKM-logo' src='./Images/DKM-logo.png' />
        </div>
        <div className='profile-shower'>
            <div className='profile-img-box'><img className='profile-img' src={`http://localhost:5000/${props.image}`} />
            
            </div>
            <div className='staff-name'>{props.name}</div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Navigator