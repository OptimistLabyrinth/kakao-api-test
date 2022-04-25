const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ msg: 'hello express js' })
})

module.exports = router
