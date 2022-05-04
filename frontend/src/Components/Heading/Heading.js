import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


import './Heading.css'
import '../Auth/Auth.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'
import WarningDisplay from '../WarningDisplay/WarningDisplay'
import Loading from '../Loading/Loading'

const Heading =(props)=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
  const [showSuccess, setShowSuc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSu, setShowSu] = useState(false)
  

  const startLoading =()=>{
      setLoading(true)
  }

  const showCleanerStart =()=>{
    setShowSuc(false)
    setLoading(false)
    setShowSu(true)
  }

  const showClean =()=>{
      setShowSu(false)
      dispatch({ type: "clear-user"});
        dispatch({type: "clear-item"})
      navigate('/staff/login')
  }

  const endLoading =()=>{
      setLoading(false)
  }

  const showCleaner =()=>{
    setShowSuc(false)
    }

const showSuc =()=>{
  setShowSuc(true)
    }

    const logOut =()=>{
        dispatch({ type: "clear-user"});
        dispatch({type: "clear-item"})
        navigate('/staff/login')
    }
    return(
        <React.Fragment>
            <Loading loading={loading} />
            {<SuccessDisplay showSuccess={showSu} showCleaner={showClean} info="Successfully deactived!"/>}
            {<WarningDisplay showSuccess={showSuccess} showCleaner={showCleaner} startLoading={startLoading} showCleanerStart={showCleanerStart}/>}
                <div className='container-heading-one'>
                    <div >
                    <div className='logo'>
                        <div className='logo-profile'><img className='profile-img' src={`http://localhost:5000/${props.user.image}`} /></div>
                        <div className='profile-name-manage'>
                        <div className='logo-account'>{props.user.name}</div>
                        <div className='sign-up-link middle' onClick={props.onManageProfile}>Manage profile</div>
                        {user.role !== 'admin' && <div onClick={showSuc} className='delete-link'>Deactivate account</div>}
                        </div>
                    </div>
                    
                    <div >
                   <div onClick={()=>props.pathChanger('register-course')} className={props.path==='register-course'?'each-navi active-navi':'each-navi'}><i className="fa-solid fa-photo-film fa-lg icon-spacing"></i>Register course</div>
                   <div onClick={()=>props.pathChanger('statistics')} className={props.path==='statistics'?'each-navi active-navi':'each-navi'}><i className="fa-solid fa-folder-open fa-lg icon-spacing"></i>Statistic course</div>
                   {
                       user.role === 'admin' &&
                   <div onClick={()=>props.pathChanger('register-course-teacher')} className={props.path==='register-course-teacher'?'each-navi active-navi':'each-navi'}><i className="fas fa-user-circle fa-lg icon-spacing"></i>Register course teacher</div>
                   }
                   <div onClick={()=>props.pathChanger('statistic-enroll')} className={props.path==='statistic-enroll'?'each-navi active-navi':'each-navi'}><i className="fa-solid fa-cash-register fa-lg icon-spacing"></i>Statistic Enrollment</div>
                   <div onClick={()=>props.pathChanger('statistic-deli')} className={props.path==='statistic-deli'?'each-navi active-navi':'each-navi'}><i className="fa-solid fa-truck-fast fa-lg icon-spacing"></i>Statistic Delivery</div>
                   <div onClick={logOut} className='each-navi'><i className="fas fa-user-circle fa-lg icon-spacing"></i>Sign out</div>
                    </div>
                    </div>
                </div>
               
        </React.Fragment>
    )
}

export default Heading