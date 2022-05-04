import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import './ManageProfile.css'
import '../Auth/Auth.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'

const ManageProfile =(props)=>{
    const [text, setText] = useState('')
    const [selectedVal, setSelectedVal] = useState('Photography')
    const [userData, setUserData] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [password, setPassword] = useState()
    const [department, setDepartment] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const departVal = useRef()


    const dispatch = useDispatch()

    
  const [showSuccess, setShowSuc] = useState(false)

    const showCleaner =()=>{
      setShowSuc(false)
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
    else if(title==='description'){
      setDescription(event.target.value)
  }
    }

  const submitHandler =async(event)=>{
    event.preventDefault();

    try {
      

        const response = await fetch(`http://localhost:5000/api/staff/${props.user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name:name,
              department:departVal.current.value,
            email: email,
            password: password,
            description:description
          })
        });
        
        const responseData = await response.json();
        let addUser = responseData.staff
        
        if(props.run !== undefined){
          props.setRun((prev)=>!prev)
        }
        else{
          dispatch({type:'input',payload:{addUser}})
        }
        props.offManageProfile()
      } catch (err) {
        
      }
  }

  

    useEffect(async()=>{
      
        const response = await fetch(`http://localhost:5000/api/staff/${props.user.id}`, {
        method: 'GET'})
        const responseData = await response.json();
        setEmail(responseData.staff.email)
        setImage(responseData.staff.image)
        setPassword(responseData.staff.password)
        setDepartment(responseData.staff.department)
        setName(responseData.staff.name)
        setDescription(responseData.staff.description)
    },[])

    return(
        <>
        {<SuccessDisplay showSuccess={showSuccess} showCleaner={showCleaner}/>}
       {email&& <>
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
            <span>Department : </span>
            
            <select ref={departVal} defaultValue=''>
                <option selected={department==='Network'?"selected":''} value="Network">Network</option>
                <option selected={department==='Web development'?"selected":''} value="Web development">Web development</option>
                <option selected={department==='Photography'?"selected":''} value="Photography">Photography</option>
                <option selected={department==='Business'?"selected":''} value="Business">Business</option>
                <option selected={department==='Software development'?"selected":''} value="Software development">
                  Software development
                </option>
              </select>
            </div>
            <div className='each-input'>
            <span>Email : </span>
            <input onChange={(event)=>onChangeHandler(event,'email')} value={email} />
            </div>
            <div className='each-input'>
            <span>Password : </span>
            <input onChange={(event)=>onChangeHandler(event,'password')} value={password}/>
            </div>
            <div className='each-input description-input'>
            <span>Description : </span>
            <textarea type="text" rows='4' onChange={(event)=>onChangeHandler(event,'description')} value={description}/>
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

export default ManageProfile