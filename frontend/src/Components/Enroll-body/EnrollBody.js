import React from 'react'

import '../Body/Body.css'
import EnrollContentBody from './Content-body/Content-body'

const EnrollBody =(props)=>{
    return(
        
 <div className='container-body'>
     
     <EnrollContentBody cNoSetor={props.cNoSetor} tNoSetor={props.tNoSetor}/>
     <div></div>
 </div>
    )

}

export default EnrollBody
