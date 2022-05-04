import React, { useState } from 'react'

import '../ManageProfile/ManageProfile.css'
import '../ErrorDisplay/ErrorDisplay.css'
import './SuccessDisplay.css'

const SuccessDisplay =(props)=>{

    const body =  (
        <>
        <div onClick={()=>props.showCleaner()} style={{backgroundColor:'rgba(0, 0, 0, 0.418)'}} className='black-sheed'></div>
        <div className='manage-profilebox error-box '>
            <div className='error-message blue-back'><h2>Notification</h2></div>
            <div className='error-text'>
            
            {
            props.info?props.info:'🥳 Successed!'
            }
            </div>
        </div>
        </>
    )
    
    return(
           <>

        {props.showSuccess && body}
       </>
    )
}

export default SuccessDisplay