const mongoose = require('mongoose')

const Departments = require('../mongoose/department')


const getDepartments = async (req,res,next)=>{
   
    let department 
    try {
        department = await Departments.find({})
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({department: department.map(each=> each.toObject({getters:true}))})
    
   
    
}

const searchDepartment = async (req,res,next)=>{
   
    let department 
    const did =req.body.did
    
    const query = []
    did.map(each=> query.push(mongoose.Types.ObjectId(each)))
    try {
        department = await Departments.find({
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
    res.status(200).json({department: department.map(each=> each.toObject({getters:true}))})
    
   
    
}

const postDepartments = async(req,res,next)=>{
   
    
        const {title} = req.body
        
    try{
        const createDepartment = new Departments({
            title
        })
        const newOne = await createDepartment.save()
        
        res.status(201).json({createDepartment: newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding department")
            error.code = 500
            return next(error)
    
        }
       
    
    }


    const updateDepartment = async(req,res,next)=>{
   
    
        const {title} = req.body
        const id = req.params.did
        
    try{
        const getDepartment = await Departments.findById(id)
        // getDepartment.title = title
        console.log(getDepartment)
      await getDepartment.save()
        
        res.status(201).json({getDepartment: getDepartment.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding department")
            error.code = 500
            return next(error)
    
        }
       
    
    }

exports.getDepartments = getDepartments
exports.postDepartments = postDepartments
exports.searchDepartment = searchDepartment
exports.updateDepartment = updateDepartment