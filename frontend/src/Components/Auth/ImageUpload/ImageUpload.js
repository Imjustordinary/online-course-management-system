import React,{useEffect, useRef, useState} from 'react'

import './ImageUpload.css'

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
        
        props.onInput(pickedFile, fileIsVaid)
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
            accept=".jpg,.png,.jpeg,.PNG"
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                {previewUrl&& <img src={previewUrl} alt="Preview"/>}
                {!previewUrl && <p>Please add an image</p>}
                </div>
            </div>
            <button type="button" onClick={pickImageHandler}>PICK IMAGE</button>
            {props.showImageError && !props.noError && <p className='pass-err'>Need image</p>}
        </div>
    )
}

export default ImageUpload