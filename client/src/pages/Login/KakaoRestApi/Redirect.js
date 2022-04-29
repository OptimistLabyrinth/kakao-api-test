import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { KAKAO_REST_API_APP_KEY } from '../../../constants'
import paths from '../../../paths'

function Redirect() {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    kakaoOauthToken(code)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function kakaoOauthToken(code) {
    try {
      const KAKAO_OAUTH_DOMAIN_URL = 'https://kauth.kakao.com'
      const { data } = await axios.post(
        KAKAO_OAUTH_DOMAIN_URL +
          '/oauth/token?grant_type=authorization_code&' +
          `client_id=${KAKAO_REST_API_APP_KEY}&` +
          `redirect_uri=${
            window.origin +
            paths.home +
            paths.login.home +
            '/' +
            paths.login.kakaoRestApi.redirect
          }&` +
          `code=${code}`
      )
      console.log(data)
      const { access_token } = data
      if (!access_token) {
        console.error('access_token undefined')
        return
      }
      const kakaoToken = JSON.stringify(data)
      window.localStorage.setItem('kakaoToken', kakaoToken)
      navigate(
        window.location.pathname + '/../' + paths.login.kakaoRestApi.after,
        {
          replace: true,
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div>
        <h2>카카오 로그인 진행중...</h2>
      </div>
    </div>
  )
}

export default Redirect
