const express = require('express')

const router = express.Router()
const deli = require('../controllers/deli-controller')

router.post('/',deli.postDeli)

router.get('/',deli.getDeli)

router.delete('/:did', deli.deleteDeli)

module.exports = router