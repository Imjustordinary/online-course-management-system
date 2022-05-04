const express = require('express')

const router = express.Router()
const enroll = require('../controllers/enroll-controller')

router.get('/',enroll.getEnroll)

router.post('/', enroll.postEnroll)

router.patch('/:eid', enroll.updateenroll)

module.exports = router