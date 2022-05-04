
import React, { useState, useContext, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import '../Auth/Auth.css'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import'../Navigator/Navigator.css'

const StaffAuth =()=>{

  const navigate = useNavigate();

const user = useSelector(state => state.user)
const kickOut = useSelector(state => state.kickOut)
const dispatch = useDispatch()



const [showPasError, setPassError] = useState(false)  

const [showError, setShowError] = useState(false)
const [errorMessage, setErrorMessage] = useState('')

const [loading, setLoading] = useState(false)

  const password = useRef()
  const email = useRef()


  const errorCleaner =()=>{
    setShowError(false)
    dispatch({type:'clean-kick-out'})
  }

  
  const clickHandler= async(event)=> {
    event.preventDefault();
    if(password.current.value.length < 5){
      setPassError(true)
    }
    if( password.current.value.length >= 5 ){
      setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value
        })
      });

      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message)
      }
      console.log(responseData.message)
      let addUser = responseData.message
      setLoading(false)
      dispatch({type:'input',payload:{addUser}})
      navigate('/staff')
    } catch (err) {
      setLoading(false)
      console.log(err.message)
      console.log('run')
      setShowError(true)
      setErrorMessage(err.message)
    }
  }}

  const passChecker=()=>{
    if(password.current.value.length >=5 && showPasError)
    {
      setPassError(false)
    }
    
  }

  useEffect(()=>{
    if(kickOut === true){
        setErrorMessage('Please login first!')
        setShowError(true)
    }
    
},[])

  

    return(
       <div className='auth-eve'>
         <ErrorDisplay showError={showError} error={errorMessage}  errorCleaner={errorCleaner}/>
         <Loading loading={loading} />
       <div className='auth-heading'>
        <img className='DKM-logo' src='http://localhost:3000/Images/DKM-logo.png' />  
         </div>
         <div className='login-container'>
        <div className='title-login'>Welcome to DKM</div>
        <div className='staff-auth'>
            <div className='auth-form'>
        <div className='auth-letter'>Staff Login</div>
        <form onSubmit={clickHandler}>
          
        <div className='each-input'>
        <div className='auth-title'>Email</div>
            <input type='email' ref={email} required/>
        </div>
        
        <div className='each-input'>
        <div className='auth-title'>Password</div>
            <input 
            type='password'
            ref={password}
            onInput={passChecker}
              />
              {showPasError&&<div className='pass-err'>{password.current.value.length < 1?"Password is required!":"Your password is too short"}</div>}
        </div>
        <div className='auth-button'>
            
<button className="button-79"  role="button" type="submit">LOGIN</button>
            </div>
</form>
 <div className='mar'>

            </div>
        </div>
        </div>
       </div>
       </div>
    )
}

export default StaffAuth
