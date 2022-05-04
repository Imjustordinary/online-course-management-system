const express = require('express')

const router = express.Router()
const department = require('../controllers/department-controller')

router.get('/',department.getDepartments)

router.post('/search', department.searchDepartment)

router.patch('/:did', department.updateDepartment)

module.exports = router