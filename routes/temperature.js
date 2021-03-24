const express = require('express')
const controller = require('../controllers/temperature')

const router = express.Router()

router.post('/', controller.add)

module.exports = router
