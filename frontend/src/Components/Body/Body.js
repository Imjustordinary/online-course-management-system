import React from 'react'

import './Body.css'
import ContentBody from './Content-body/Content-body'

const Body =(props)=>{
    return(
        
 <div className='container-body'>
     <div className='middle-body'>
         <div className='each-block'>
             <div className='in-each-block'>
                 <div className='in-each-block-number'>{props.courseNo}</div>
                 <div>Courses</div>
             </div>
             <i class="fa-solid fa-photo-film fa-3x"></i></div>  
             <div className='each-block'>
             <div className='in-each-block'>
                 <div className='in-each-block-number'>{props.teacherNo}</div>
                 <div>Course teachers</div>
             </div>
             <i className="fas fa-user-circle fa-3x"></i></div> 
             <div className='each-block'>
             <div className='in-each-block'>
                 <div className='in-each-block-number'>5</div>
                 <div>Categories</div>
             </div>
             <i class="fa-solid fa-layer-group fa-3x"></i></div>
     </div>
     <ContentBody onUpdate={props.onUpdate} cNoSetor={props.cNoSetor} tNoSetor={props.tNoSetor}/>
     <div></div>
 </div>
    )

}

export default Body
