const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    name: { type: String , required:true},
    type:{type: String , required:true},
    category:{type: String , required:true},
    preview: { type: String , required:true},
    date:{type:String, required:true},
    image:{type:String, required:true},
    course:{type:String, required:true},
    books:{type:Array, required:true},
    price:{type:String, required:true},
    description:{type:String, required:true},
    creator:{type:mongoose.Types.ObjectId, required:true, ref:'Staff'}
    
})

module.exports = mongoose.model('Course',coursesSchema)