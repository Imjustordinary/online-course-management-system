const  path  = require('path');
const multer = require('multer')

const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
    'video/mp4':'mp4'
}

const videoUpload = multer({
    limits:50000,
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, 'uploads/videos')
        },
        filename: (req, file, cb)=>{
            const ext = MIME_TYPE_MAP[file.mimetype]
            
            cb(null,uuidv4()+path.extname(file.originalname))

        },
        fileFilter: (req, file, cb)=>{
            const isValid = !!MIME_TYPE_MAP[file.minetype]
            let error = isValid? null: new Error("This is not video")
            cb(error, isValid)
        }
    })
})

module.exports = videoUpload