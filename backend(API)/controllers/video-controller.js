const Videos = require('../mongoose/video-course')
const Previews = require('../mongoose/preview-course')

   
const postVideo = async(req,res,next)=>{
    
try{
    const createVideo = new Videos({
        video: req.file.path
    })
    const newOne = await createVideo.save()
    
    res.status(201).json({createdVideo: newOne.toObject({getters:true})})
    
    }
    catch(err){
        const error = new Error("There is a problem in adding video")
        error.code = 500
        return next(error)
    }
}

const postPreview = async(req,res,next)=>{
    
    try{
        const createPreview = new Previews({
            preview: req.file.path
        })
        const newOne = await createPreview.save()
        
        res.status(201).json({createdPreview: newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding preview")
            error.code = 500
            return next(error)
        }
    }

    exports.postPreview = postPreview
    exports.postVideo = postVideo