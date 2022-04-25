const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ msg: 'REST API VERSION 1' })
})

module.exports = router
