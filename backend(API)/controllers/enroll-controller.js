const mongoose = require('mongoose')

const Enroll = require('../mongoose/enroll')
const Users = require('../mongoose/user')

const getEnroll = async (req,res,next)=>{
   
    let enroll 
    try {
        enroll = await Enroll.find({}).sort({ _id: -1 })
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({enroll: enroll.map(each=> each.toObject({getters:true}))})
    
   
    
}

const searchenroll = async (req,res,next)=>{
   
    let enroll 
    const did =req.body.did
    
    const query = []
    did.map(each=> query.push(mongoose.Types.ObjectId(each)))
    try {
        enroll = await Enroll.find({
            '_id': { $in:
            query
            }
        })
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({enroll: enroll.map(each=> each.toObject({getters:true}))})
    
   
    
}

const postEnroll = async(req,res,next)=>{
   
    
        const {buyer, date, totalPrice, totalQuantity, course, address,phoneNumber } = req.body
        
    try{
        const createdenroll = new Enroll({
            buyer, date, totalPrice, totalQuantity, course, address,phoneNumber, status:'pending'
        })
        const newOne = await createdenroll.save()
        
        res.status(201).json({createdenroll: newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding enroll")
            error.code = 500
            return next(error)
    
        }
       
    
    }


    const updateenroll = async(req,res,next)=>{
   
    
        const {status} = req.body
        const id = req.params.eid
        
    try{
        const getenroll = await Enroll.findById(id)
        getenroll.status = status
       
      await getenroll.save()
        
        res.status(201).json({getenroll: getenroll.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding enroll")
            error.code = 500
            return next(error)
    
        }
       
    
    }

exports.getEnroll = getEnroll
exports.postEnroll = postEnroll
exports.searchenroll = searchenroll
exports.updateenroll = updateenroll