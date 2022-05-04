import React,{useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Loading from '../Loading/Loading'
import SuccessDisplay from '../SuccessDisplay/SuccessDisplay'
import '../Body/Body.css'
import '../Auth/Auth.css'
import '../Register-body/Register-body.css'
import './Register-course.css'

const RegisterCourse =(props)=>{

    const selectedOption = useRef() 
    const typeSelectedOption = useRef()
    const cateSelectedOption = useRef()

    const user = useSelector(state => state.user)

    const [books, setbooks] = useState(['',''])
    const [video, setVideo] = useState()
    const [course, setCourse] = useState()
    const [image, setImage] = useState()
    const name = useRef()
    const price = useRef()
    const description = useRef()

    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const [showSuccess, setShowSuc] = useState(false)
    const [loading, setLoading] = useState(false)

    const selectChange =()=>{
        console.log(selectedOption.current.value)
    }

    const showCleaner =()=>{
        setShowSuc(false)
        props.pathChanger('statistics')
    }

   

    const bookOnchange =(event, id)=>{
        books[id] = event.target.value
        const nenwBooks = [...books]
        setbooks(nenwBooks)
    }

   

    const addNewBook =()=>{
        const newBooks = [...books, '']
        setbooks(newBooks)
    }

   
    const registerInput = async(event)=>{
        event.preventDefault();
        
        setLoading(true)
        try {
            const formdata = new FormData();
            formdata.append("preview", video);
            
            // formdata.append("name", name.current.value);
            // formdata.append("books", books);
            // formdata.append("description", description.current.value);

            const formdataTwo = new FormData()
            formdataTwo.append("video", course);
      
            const response = await fetch("http://localhost:5000/api/course/preview", {
              method: "POST",
              body: formdata,
            });
            const responseData = await response.json();
      
            

            const responseTwo = await fetch("http://localhost:5000/api/course/video", {
              method: "POST",
              body: formdataTwo,
            });
            const responseDataTwo = await responseTwo.json();
            

            const finalFormData = new FormData()
            finalFormData.append("name", name.current.value);
            finalFormData.append("preview", responseData.createdPreview.preview)
            finalFormData.append("image", image)
            finalFormData.append("price", price.current.value)
            finalFormData.append("course", responseDataTwo.createdVideo.video)
            
            finalFormData.append("description", description.current.value);
            finalFormData.append("type",typeSelectedOption.current.value)
            finalFormData.append("category",cateSelectedOption.current.value)
            finalFormData.append("date",date)
            
            books.map((each)=>{
                finalFormData.append('books[]', each);
            }
                )

            const finalResponse = await fetch(`http://localhost:5000/api/course/${user.id}`, {
              method: "POST",
              body: finalFormData,
            });
            const finalResponseData = await finalResponse.json();
            console.log(finalResponseData);
            setLoading(false)
            setShowSuc(true)
          } catch (err) {
            
          }
    }

    const setVideoHandler =(event)=>{
        if(event.target.files && event.target.files.length === 1){
            setVideo(event.target.files[0])
            
        }
    }

    const setCourseHandler =(event)=>{
        if(event.target.files && event.target.files.length === 1){
            setCourse(event.target.files[0])
            
        }
    }

    const setImageHandler =(event)=>{
        if(event.target.files && event.target.files.length === 1){
            setImage(event.target.files[0])
            
        }
    }

    return(
        <React.Fragment>
            <SuccessDisplay showSuccess={showSuccess} showCleaner={showCleaner}/>
            <Loading loading={loading} />
       <div className='container-body'>
        <div className='register-form'>
       <div className='title-form'>Register Course</div>
            
            <div className='each-input-form'>
                <span>Name : </span>
                <input ref={name} type='text'  required/>
            </div>
            <div className='each-input-form flex'>
                <span>Course image : </span>
               <div className="left-margin"><input onChange={setImageHandler} required  type="file"
            accept=".jpg,.png,.jpeg,.PNG" /></div>
            </div>
            
            <div className="each-input-form">
              <span>Category : </span>
              <select ref={cateSelectedOption}>
                <option value="Network">Network</option>
                <option value="Web development">Web development</option>
                <option value="Photography">Photography</option>
                <option value="Business">Business</option>
                <option value="Software development">
                  Software development
                </option>
              </select>
            </div>
            <div className="each-input-form">
              <span>Type : </span>
              <select ref={typeSelectedOption}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className='each-input-form'>
                <span>Price : </span>
                $ <input ref={price} type='number' min="1" max="100" placeholder='10' required/>
            </div>
            <div className='each-input-form flex'>
                <span>Preview video : </span>
               <div className="left-margin"><input onChange={setVideoHandler}  type="file"
            accept=".mp4" /></div>
            </div>
            <div className='each-input-form flex'>
                <span>Course video : </span>
               <div className="left-margin"><input onChange={setCourseHandler}  type="file"
            accept=".mp4" /></div>
            </div>
            <div className='each-input-form book-input-form'>
                <div className='book-title'>Book : </div>
                <div>
                {
                    books.map(
                        (each,id)=> <div key={id}><input onInput={(e)=>bookOnchange(e,id)} required /> </div>
                    )
                }
                <div onClick={addNewBook} className='add-book'>Add more book</div>
                </div>
            </div>
            <div className='each-input-form description-input'>
                <span className='des-title'>Description : </span>
                <textarea ref={description} type="text" rows='4' required/>
            </div>
           
            <div >
            <button onClick={registerInput} className="button-79 reg-margin">
                Register
            </button>
            </div>
        </div>
       </div>
        </React.Fragment>
    )
}

export default RegisterCourse