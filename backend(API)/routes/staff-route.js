const express = require('express')

const router = express.Router()
const staff = require('../controllers/staff-controller')
const fileUpload = require('../middleware/file-upload')


router.get('/', staff.getStaffs)

router.post('/login', staff.loginStaff)

router.get('/:sid', staff.getStaffs)

router.post('/', 
fileUpload.single('image'), 
staff.postStaff)

router.post('/:sid', staff.statusUpdate)

router.patch('/:sid', staff.updateStaff)

module.exports = router