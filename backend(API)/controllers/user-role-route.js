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
    res.json({department: department.map(each=> each.toObject({getters:true}))})
    
   
    
}

const postDepartments = async (req,res,next)=>{
   
 
    const {title} = req.body
    try{
        const createDepartment = new Departments({
            title
        })
        const newOne = await createDepartment.save()
        res.status(201).json({createDepartment:newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in signning up")
            error.code = 500
            return next(error)
    
        }
    }

exports.getDepartments = getDepartments
exports.postDepartments = postDepartments