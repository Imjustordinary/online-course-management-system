const mongoose = require('mongoose')

const Cus_course = require("../mongoose/customer-course");
const Courses = require("../mongoose/course");

const postCus = async (req, res, next) => {
  const { customer, courses } = req.body;

  let cus_course;

  try {
    cus_course = await Cus_course.findOne({ customer: customer });
    if (cus_course) {
      cus_course.courses.push(...courses);

      await cus_course.save();
      res
        .status(200)
        .json({ cus_course: cus_course.toObject({ getters: true }) });
    } else {
      try {
        const createCus = new Cus_course({
          customer,
          courses,
        });
        const newOne = await createCus.save();
        res.status(201).json({ createCus: newOne.toObject({ getters: true }) });
      } catch (err) {
        const error = new Error("There is a problem in signning up");
        error.code = 500;
        return next(error);
      }
    }
  } catch (err) {
    const error = new Error("There is a problem in signning up");
    error.code = 500;
    return next(error);
  }
};


const searchCus = async (req, res, next)=>{
    const { customer  } = req.body;
    

    let cus_course;
    let getCourse;
    
    
  try {
    cus_course = await Cus_course.findOne({ customer: customer });
    if (cus_course) {
    
    const query = []
    cus_course.courses.map(each=> query.push(mongoose.Types.ObjectId(each)))
    try {
        getCourse = await Courses.find({
            '_id': { $in:
            query
            }
        }).sort({ _id: -1 })
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({getCourse: getCourse.map(each=> each.toObject({getters:true}))})
    }
    else{
      res.status(200).json({getCourse: []})
    }
  }
  catch(err){

  }
}

const searchCusID =async (req, res, next)=>{
  const id = req.params.uid
  try {
    cus_course = await Cus_course.findOne({ customer: id });
    if (!cus_course) {
      const error = new Error("There aren't any courses!")
        error.code = 500
        return next(error)
    }
  }
    catch(err){
      const error = new Error('Error in finding the courses')
      error.code = 500
      return next(error)
  }
  res.status(200).json({getCourse: cus_course.toObject({getters:true})})
}

exports.postCus = postCus;
exports.searchCus = searchCus;
exports.searchCusID = searchCusID;
