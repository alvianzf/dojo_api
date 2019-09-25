var router = require('express').Router()

router.use('/users', require('./User'))

module.exports = router
