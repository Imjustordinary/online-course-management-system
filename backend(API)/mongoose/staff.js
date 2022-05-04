const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const staffsSchema = new mongoose.Schema({
    name: { type: String , required:true},
    status:{ type: String , required:true},
    role:{type:String, required:true},
    department:{type:String, required:true},
    email:{type:String, required:true, },
    password:{type:String, required:true, minlength:6},
    image:{type:String, required:true},
    description:{type:String, required:true},
    courses:[{type:mongoose.Types.ObjectId, required:true, ref:'Course'}]
    
})

staffsSchema

module.exports = mongoose.model('Staff',staffsSchema)