import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import './ManageProfile.css'
import '../Auth/Auth.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'
import Loading from '../Loading/Loading'

const CusManageProfile =(props)=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState()

    const [loading, setLoading] = useState(false)
    
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    
  const [showSuccess, setShowSuc] = useState(false)

    const showCleaner =()=>{
      setShowSuc(false)
      props.offManageProfile()
  }

    const [showError, setShowError] = useState(false)

    const onChangeHandler =(event, title)=>{
       if(title==='name'){
           setName(event.target.value)
       }
       else if(title==='email'){
        setEmail(event.target.value)
    }
    else if(title==='password'){
        setPassword(event.target.value)
    }
   
    }

  const submitHandler =async(event)=>{
    event.preventDefault();
    setLoading(true)
    try {
      

        const response = await fetch(`http://localhost:5000/api/user/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name:name,
             
            email: email,
            password: password,
            
          })
        });
        
        const responseData = await response.json();
        console.log(responseData);
        let addUser = responseData.user
        dispatch({type:'input',payload:{addUser}})
        setLoading(false)
        setShowSuc(true)

      } catch (err) {
        
      }
  }

  

    useEffect(async()=>{
      
        const response = await fetch(`http://localhost:5000/api/user/${user.id}`, {
        method: 'GET'})
        const responseData = await response.json();
        setEmail(responseData.existingUser.email)
        setImage(responseData.existingUser.image)
        setPassword(responseData.existingUser.password)
        setName(responseData.existingUser.name)
    },[])

    return(
        <>
        <Loading loading={loading} />
        {<SuccessDisplay showSuccess={showSuccess} showCleaner={showCleaner}/>}
       {email&& showSuccess!==true &&<>
        <div onClick={()=>props.offManageProfile()} className='black-sheed'></div>
        <div className='manage-profilebox profile-size'>
            <div className='manage-profile-title'>Manage profile</div>
            <form onSubmit={submitHandler}>

            <div className='manage-image'><img src={`http://localhost:5000/${image}`} className='profile-img' /></div>
            <div className='each-input'>
            <span>Name : </span>
            <input onChange={(event)=>onChangeHandler(event,'name')} value={name}/>
            </div>
            
            <div className='each-input'>
            <span>Email : </span>
            <input onChange={(event)=>onChangeHandler(event,'email')} value={email} />
            </div>
            <div className='each-input'>
            <span>Password : </span>
            <input type="password" onChange={(event)=>onChangeHandler(event,'password')} value={password}/>
            </div>
            
            <div >
            <button type="submit" className="button-79">Apply</button>
            </div>
            </form>
            
        </div>
       </>
       }
        </>
    )
}

export default CusManageProfile