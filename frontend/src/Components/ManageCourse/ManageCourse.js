import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import '../ManageProfile/ManageProfile.css'
import '../Auth/Auth.css'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'

const ManageCourse =(props)=>{
    const [courseData, setCourseData] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [book, setBook] = useState([])
    const [cate, setCate] = useState()
    const [type, setType] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()

    const cateVal = useRef()
    const typeVal = useRef()


    const [showError, setShowError] = useState(false)

    const onChangeHandler =(event, title)=>{
       if(title==='name'){
           setName(event.target.value)
       }
    else if(title==='description'){
        setDescription(event.target.value)
    }
    else if(title === 'price'){
      setPrice(event.target.value)
    }
    }

  const submitHandler =async(event)=>{
    event.preventDefault();
    
    try {
        const response = await fetch(`http://localhost:5000/api/course/${props.id}`, {
          method: 'PATCH',
          
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name:name,
              description:description,
            category:cateVal.current.value,
            type:typeVal.current.value,
            books:book,
            price:price
          })
        });
        
        const responseData = await response.json();
        props.editData(responseData)
       
        
        props.offManage()
      } catch (err) {
        
      }
  }

  const errorCleaner =()=>{
    setShowError(false)
  }

  const bookOnchange =(event, id)=>{
    book[id] = event.target.value
    const nenwBooks = [...book]
    setBook(nenwBooks)
}

  const addNewBook =()=>{
    const newBooks = [...book, '']
    setBook(newBooks)
}

const getDetail = async()=>{
      
  const response = await fetch(`http://localhost:5000/api/course/${props.id}`, {
  method: 'GET'})
  const responseData = await response.json();
  setImage(responseData.course.image)
  setBook(responseData.course.books)
  setDescription(responseData.course.description)
  setType(responseData.course.type)
  setPrice(responseData.course.price)
  setCate(responseData.course.category)
  setName(responseData.course.name)
}

    useEffect(()=>
      {
        getDetail()
      }
      ,[])

    return(
        <>
        {<SuccessDisplay showError={showError} errorCleaner={errorCleaner} />}
        { image &&
        
       <>
      
        <div onClick={()=>props.offManage()} className='black-sheed'></div>
        <div className='manage-profilebox profile-size'>
            <div className='manage-profile-title'>Edit course</div>
            <form onSubmit={submitHandler}>

            <div className='manage-image'><img src={`http://localhost:5000/${image}`} className='course-profile-img' /></div>
            <div className='each-input'>
            <span>Name : </span>
            <input onChange={(event)=>onChangeHandler(event,'name')} value={name}/>
            </div>
            <div className='each-input'>
            <span>Category : </span>
            
            <select ref={cateVal} defaultValue=''>
                <option selected={cate==='Network'?"selected":''} value="Network">Network</option>
                <option selected={cate==='Web development'?"selected":''} value="Web development">Web development</option>
                <option selected={cate==='Photography'?"selected":''} value="Photography">Photography</option>
                <option selected={cate==='Business'?"selected":''} value="Business">Business</option>
                <option selected={cate==='Software development'?"selected":''} value="Software development">
                  Software development
                </option>
              </select>
            </div>
            <div className='each-input'>
            <span>Type : </span>
            
            <select ref={typeVal} defaultValue=''>
                <option selected={type==='Beginner'?"selected":''} value="Beginner">Beginner</option>
                <option selected={type==='Intermediate'?"selected":''} value="Intermediate">Intermediate</option>
                <option selected={type==='Advanced'?"selected":''} value="Advanced">Advanced</option>
               
              </select>
            </div>
            <div className='each-input'>
            <span>Price : </span>
            $ <input onChange={(event)=>onChangeHandler(event,'price')} value={price} type='number' min="1" max="100"/>
            </div>
            <div className='each-input-form book-input-form'>
                <div className='book-title'>Book : </div>
                <div>
                {
                    book.map(
                        (each,id)=> <div key={id}><input onInput={(e)=>bookOnchange(e,id)} value={each}/> </div>
                    )
                }
                <div onClick={addNewBook} className='add-book'>Add more book</div>
                </div>
            </div>
            <div className='each-input des-input'>
            <span>Description : </span>
            <textarea onChange={(event)=>onChangeHandler(event,'description')} value={description}/>
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

export default ManageCourse