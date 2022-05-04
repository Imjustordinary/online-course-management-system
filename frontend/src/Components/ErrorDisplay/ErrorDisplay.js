import React, { useState } from 'react'

import '../ManageProfile/ManageProfile.css'
import './ErrorDisplay.css'

const ErrorDisplay =(props)=>{

    const errorBody =  (
        <>
        <div onClick={()=>props.errorCleaner()} style={{backgroundColor:'rgba(0, 0, 0, 0.418)'}} className='black-sheed'></div>
        <div className='manage-profilebox error-box'>
            <div className='error-message red-back'><h2>An error occour!</h2></div>
            <div className='error-text'>

            {props.error}
            </div>
        </div>
        </>
    )
    
    return(
           <>

        {props.showError && errorBody}
       </>
    )
}

export default ErrorDisplay