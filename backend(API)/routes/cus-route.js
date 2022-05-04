const express = require('express')

const router = express.Router()
const cus = require('../controllers/customer-course')


router.post('/', cus.postCus)

router.get('/:uid', cus.searchCusID)

router.post('/search', cus.searchCus)

module.exports = router