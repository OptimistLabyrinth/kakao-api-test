const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()

const KAKAO_API_DOMAIN_URL = 'https://kapi.kakao.com'

router.get('/', (req, res) => {
  res.send({ msg: 'kakao related api' })
})

router.post('/try_login', async (req, res) => {
  // eslint-disable-next-line no-undef
  console.log({ 'req.body': req.body })
  const { access_token } = req.body

  try {
    const { data } = await axios({
      method: 'GET',
      url: KAKAO_API_DOMAIN_URL + '/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    // eslint-disable-next-line no-undef
    console.log({ result: data })
    // eslint-disable-next-line no-undef
    console.log({ kakao_account: data.kakao_account })

    const { id } = data

    // TODO 이렇게 가져온 카카오 계정 id 가 서비스에 이미 가입한 사용자인지 확인 후 적절한 응답으로 돌려주기
    // *  case 1) 신규 사용자이면
    // *    카카오 계정 id 를 포함해서 access_token, expires_in, refresh_token, refresh_token_expires_in
    // *    { need_signup: true } 값까지 포함해서 전달하게 됨
    // *    프론트엔드에서는 회원가입 첫번째 페이지로 리디렉션
    // *  case 2) 이미 등록되어 있는 사용자라면
    // *    데이터베이스에서 muser id 찾아서 JWT 토큰 생성해서 원래대로 로그인 관련 정보(e.g. access_token, uuid, refresh_token 등)
    // *    그리고 { need_signup: false } 값까지
    // *    프론트엔드에서는 메인 페이지로 리디렉션

    if (!id) {
      res.send('FAILED')
      return
    }
    res.send('OK')
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error({ loc: '/api/v1/kakao/login_using_kakao', error })
    res.send('ERROR')
  }
})

router.post('/logout', async (req, res) => {
  // * 프론트에서 REST API 사용해서 로그아웃 시도하면 CORS 오류 발생하므로 서버쪽에서 처리해야 함

  // eslint-disable-next-line no-undef
  console.log({ 'req.body': req.body })
  const { access_token } = req.body

  try {
    const { data } = await axios({
      method: 'POST',
      url: KAKAO_API_DOMAIN_URL + '/v1/user/logout',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    // eslint-disable-next-line no-undef
    console.log({ data })

    const { id } = data
    if (!id) {
      res.send('FAILED')
      return
    }
    res.send('OK')
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error({ loc: '/api/v1/kakao/logout', error })
    res.send('ERROR')
  }
})

router.post('/unlink', async (req, res) => {
  // TODO 카카오 연결끊기 이후에 DB 에 inactive 처리한다.
  // * 1) 카카오 연결끊기
  // * 2) DB에서 카카오로 로그인한 계정인지 확인하는 테이블 status = 'deactive' 업데이트
  // * 3) DB에서 사용자 테이블 ustatus = 'deactive' 업데이트
  // eslint-disable-next-line no-undef
  console.log({ 'req.body': req.body })

  const { access_token } = req.body

  try {
    const { data } = await axios({
      method: 'POST',
      url: KAKAO_API_DOMAIN_URL + '/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // eslint-disable-next-line no-undef
    console.log({ data })

    const { id } = data
    if (!id) {
      res.send('NOT FOUND')
      return
    }
    res.send('OK')
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error({ loc: '/api/v1/kakao/unlink', error })
    res.send('ERROR')
  }
})

module.exports = router
