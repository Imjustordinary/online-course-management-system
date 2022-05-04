import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../ManageProfile/ManageProfile.css'
import '../ErrorDisplay/ErrorDisplay.css'
import '../SuccessDisplay/SuccessDisplay.css'
import './WarningDisplay.css'
import '../Auth/Auth.css'
import Loading from '../Loading/Loading'

const WarningDisplay =(props)=>{

    
const user = useSelector(state => state.user)

    const deactiveAccount = async()=>{
        props.startLoading()
        try{
        const response = await fetch(`http://localhost:5000/api/staff/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              status:'inactive'
          })
        });
        
        const responseData = await response.json();
        console.log(responseData);
        props.showCleanerStart()
        if(!response.ok){
            throw new Error(responseData.message)
          }
          
    }
    catch(err){

    }
    }

    const body =  (
        <>
        <div onClick={()=>props.showCleaner()} style={{backgroundColor:'rgba(0, 0, 0, 0.418)'}} className='black-sheed'></div>
        <div className='manage-profilebox error-box '>
            <div className='error-message yellow-back'><h2>Warning!</h2></div>
            <div className='warning-box'>
            Are you sure to deactivate this account?
            <div className='warning-buts'>
            <button onClick={()=>props.showCleaner()} className="button-79 cancel"  role="button">Cancel</button>
            <button onClick={deactiveAccount} className="button-79 deactive"  role="button">Deactivate it</button>
            </div>
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

export default WarningDisplay