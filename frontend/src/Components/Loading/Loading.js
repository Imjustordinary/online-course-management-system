import React, { useState } from 'react'

import '../ManageProfile/ManageProfile.css'
import './Loading.css'

const Loading =(props)=>{

    const loadingBody =  (
        <>
        <div style={{zIndex:"60"}}  className='black-sheed white'></div>
        <div className='loading-container'>
            
        <div className="lds-facebook index"><div></div><div></div><div></div></div>
        </div>
        </>
    )
    
    return(
           <>

        {props.loading && loadingBody}
       </>
    )
}

export default Loading