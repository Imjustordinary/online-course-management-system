const express = require('express')

const router = express.Router()
const course = require('../controllers/course-controller')
const fileUpload = require('../middleware/file-upload')
const videoController = require('../controllers/video-controller')
const videoUpload = require('../middleware/video-upload')

router.get('/',course.getCourses)

router.get('/:cid', course.getCourses)

router.get('/filter/:filter', course.filterCourses)

router.post('/video', videoUpload.single('video'), videoController.postVideo)

router.post('/preview', videoUpload.single('preview'), videoController.postPreview)

router.post('/:sid',
fileUpload.single('image'), 
course.postCourses)

router.patch('/:cid', course.updateCourse)

router.delete('/:cid', course.deleteCourses)

module.exports = router