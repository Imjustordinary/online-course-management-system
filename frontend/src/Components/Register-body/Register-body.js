import React, { useRef, useState } from "react";

import ImageUpload from "../Auth/ImageUpload/ImageUpload";
import SuccessDisplay from "../SuccessDisplay/SuccessDisplay";
import Loading from "../Loading/Loading";
import "../Body/Body.css";
import "../Auth/Auth.css";
import "./Register-body.css";

const RegisterBody = () => {
  const selectedOption = useRef();
  const [image, setImage] = useState();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const description = useRef()

  const [showSuccess, setShowSuc] = useState(false)
  const [loading, setLoading] = useState(false)

  const showCleaner =()=>{
    setShowSuc(false)
}


  const onInput = (pickedFile, fileIsVaid) => {
    setImage(pickedFile);
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    let role = "course teacher";
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("role", role);
      formdata.append("department", selectedOption.current.value);
      formdata.append("name", name.current.value);
      formdata.append("email", email.current.value);
      formdata.append("password", password.current.value);
      formdata.append("description", description.current.value);

      const response = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        body: formdata,
      });
      const responseData = await response.json();

      console.log(responseData);
      setLoading(false)
            setShowSuc(true)
    } catch (err) {
      
    }
  };

  return (
    <React.Fragment>
      <SuccessDisplay showSuccess={showSuccess} showCleaner={showCleaner}/>
            <Loading loading={loading} />
      <div className="container-body">
        <div className="register-form">
          <div className="title-form">Register Staff</div>
          <form onSubmit={registerHandler}>
            <div className="each-input-form">
              <span>Name : </span>
              <input type='text' ref={name} required/>
            </div>
            <div className="each-input-form flex">
              <span>Image : </span>
              <div className="left-margin">
                <ImageUpload onInput={onInput} noError center />
              </div>
            </div>
            <div className="each-input-form">
              <span>Department : </span>
              <select ref={selectedOption}>
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
              <span>Email : </span>
              <input type="email" ref={email} required />
            </div>
            <div className="each-input-form">
              <span>Password : </span>
              <input type="password" ref={password} required/>
            </div>
            <div className='each-input-form description-input'>
                <span className='des-title'>Description : </span>
                <textarea ref={description} type="text" rows='4' required/>
            </div>
            <div>
              <button type="submit" className="button-79 reg-margin">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterBody;
