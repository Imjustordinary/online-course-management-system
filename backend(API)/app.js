const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const staffRoutes = require('./routes/staff-route')
const departmentRoutes = require('./routes/department-route')
const courseRoutes = require('./routes/course-route')
const userRoutes = require('./routes/user-route')
const enrollRoutes = require('./routes/enroll-route')
const cusRoutes = require('./routes/cus-route')
const deliRoutes = require('./routes/deli-route')


const app = express()


app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/uploads/videos', express.static(path.join('uploads', 'videos')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Reqested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
  })

app.use('/api/staff',staffRoutes)

app.use('/api/department',departmentRoutes)

app.use('/api/course', courseRoutes)

app.use('/api/user', userRoutes)

app.use('/api/enroll', enrollRoutes)

app.use('/api/cus',cusRoutes)

app.use('/api/deli', deliRoutes)

app.use((req,res,next)=>{
    const error = new Error("Could not find this route")
    error.code = 500
    return next(error)
})

app.use((error, req, res, next) =>{
  if (req.file){
    fs.unlink(req.file.path, err=>{
      console.log(err)
    })
  }

    if(res.headerSent){
       return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'This is server error'})

})

mongoose.connect('mongodb+srv://jimmy:12345@cluster0.eth3n.mongodb.net/courseManagementdb?retryWrites=true&w=majority')
.then(app.listen(5000))
.catch(err=>console.log(err))

