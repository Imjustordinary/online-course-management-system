
import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import './Auth.css'
import'../Navigator/Navigator.css'


import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import ImageUpload from './ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Auth =()=>{
  
  const navigate = useNavigate();
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const [fileIsVaid, setFileIsVaid] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  
  
  
  const [showPasError, setPassError] = useState(false)  
  const [showImageError, setImageError] = useState(false)
  const [image, setImage] = useState()
  
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const [loading, setLoading] = useState(false)
  
  const textInput = useRef();
  const password = useRef()
  const email = useRef()
  

  const errorCleaner =()=>{
    setShowError(false)
  }
  
  const changePathHandler =()=>{
    navigate('/')
  }

  
  const clickHandler= async(event)=> {
    event.preventDefault();
    
    
    if(password.current.value.length < 5){
      setPassError(true)
    }
    if(!isLoginMode)
    {
    if(!fileIsVaid){
      setImageError(true)
    }
    if( password.current.value.length >= 5 && fileIsVaid){
      setLoading(true)
    try{
      const formdata = new FormData();
        formdata.append('image',image)
        formdata.append('name',textInput.current.value)
        formdata.append('email',email.current.value)
        formdata.append('password',password.current.value)
      
      

    const response = await fetch('http://localhost:5000/api/user/signup',{
      method: 'POST',
      body: formdata
    })
    const responseData = await response.json();
    if(!response.ok){
      throw new Error(responseData.message)
    }
    let addUser = responseData.user
    console.log(addUser)
    dispatch({type:'input',payload:{addUser}})
      setLoading(false)
      navigate('/')
    }
    catch(err){
      setLoading(false)
      console.log(err.message)
      setShowError(true)
      setErrorMessage(err.message)
    }
  }}
  else{
    if( password.current.value.length >= 5 ){
      setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
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
      console.log(responseData.existingUser)
      let addUser = responseData.existingUser
      setLoading(false)
      dispatch({type:'input',payload:{addUser}})
      navigate('/')
    } catch (err) {
      setLoading(false)
      console.log(err.message)
      console.log('run')
      setShowError(true)
      setErrorMessage(err.message)
    }
  }}}

  const passChecker=()=>{
    if(password.current.value.length >=5 && showPasError)
    {
      setPassError(false)
    }
  }

  const switchHandler=()=>{
    setIsLoginMode(prevStat => !prevStat)
  }

  const onInput=(pickedFile, fileIsVaid)=>{
   setImage(pickedFile)
   setFileIsVaid(fileIsVaid)
   setImageError(!fileIsVaid)
  }

    return(
       <div className='auth-eve'>
         <ErrorDisplay showError={showError} error={errorMessage}  errorCleaner={errorCleaner}/>
         <Loading loading={loading} />
       <div className='auth-heading'>
         <img onClick={changePathHandler} className='DKM-logo auth-logo' src='./Images/DKM-logo.png' />
         </div>
        <div className='auth-container'>
            <div className='auth-form'>
        <div className='auth-letter'>{isLoginMode? 'Login': 'Sign up'}</div>
        <form onSubmit={clickHandler}>
          {!isLoginMode &&
        <div className='each-input'>
            <div className='auth-title'>Name</div>
            <input  
            
            ref={textInput}
          />
          
        </div>}
        {!isLoginMode && <ImageUpload onInput={onInput} showImageError = {showImageError} center/>}
        <div className='each-input'>
        <div className='auth-title'>Email</div>
            <input type='email' ref={email}/>
        </div>
        
        <div className='each-input'>
          
        <div className='auth-title'>Password</div>
            <input 
            type='password'
            ref={password}
            onInput={passChecker}
              />
              
              {showPasError&&<div className='pass-err'>{password.current.value.length< 1?"Password is required!":"Your password is too short"}</div>}
        </div>
        <div className='auth-button'>
            
<button className="button-79"  role="button" type="submit">{isLoginMode ? 'LOGIN' : 'SIGNUP'}</button>
            </div>
</form>
 <div className='mar'>
 {isLoginMode ?
            <span>Need an account? <span  onClick={switchHandler} className='sign-up-link'>Sign up</span></span>: <span onClick={switchHandler} className='sign-up-link'>Change to login</span>
 }
            </div>
        </div>
        </div>
        <div className='footer'>© DKM 2022</div>
       </div>
    )
}

export default Auth
