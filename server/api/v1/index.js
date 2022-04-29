const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', (req, res) => {
  res.send({ msg: 'REST API VERSION 1' })
})

const kakaoRouter = require('./kakao')
router.use('/kakao', kakaoRouter)

module.exports = router
