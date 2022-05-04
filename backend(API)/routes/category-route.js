const express = require('express')

const router = express.Router()
const department = require('../controllers/department-controller')

router.get('/',department.getDepartments)

router.post('/', department.postDepartments)

module.exports = router