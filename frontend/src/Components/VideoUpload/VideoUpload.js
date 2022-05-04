import React,{useEffect, useRef, useState} from 'react'

import '../Auth/ImageUpload/ImageUpload'

const ImageUpload =props=>{
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] =useState()
    const [isValid, setIsValid] = useState(false)

    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return

        }
        const fileReader = new FileReader()
        fileReader.onload = ()=>{
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    },[file])

    const imageHandler =(event)=>{
        let pickedFile;
        let fileIsVaid = isValid
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsVaid=true

        }
        else{
            setIsValid(false)
            fileIsVaid = false

        }
        
        props.onInput(pickedFile)
    }

    const pickImageHandler =()=>{
        
        filePickerRef.current.click();
        
    }
    return(
        <div className="form-control">
            <input
            onChange={imageHandler}
            
            ref={filePickerRef}
            style={{display:'none'}}
            type="file"
            accept=".mp4"
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                {previewUrl&& <img src={previewUrl} alt="Preview"/>}
                {!previewUrl && <p>Please add a video</p>}
                </div>
            </div>
            <button type="button" onClick={pickImageHandler}>PICK VIDEO</button>
           
        </div>
    )
}

export default ImageUpload