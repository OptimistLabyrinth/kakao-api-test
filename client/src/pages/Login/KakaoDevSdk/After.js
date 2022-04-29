import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MarginedDiv from '../../../components/MarginedDiv'
import PaddedButton from '../../../components/PaddedButton'
import { KAKAO_JAVASCRIPT_APP_KEY, SERVER_DOMAIN_URL } from '../../../constants'
import paths from '../../../paths'

const title = '카카오 로그인 성공'

const buttonsText = {
  kakaoLogout: '카카오 로그아웃',
  kakaoUnlink: '카카오 연결끊기',
}

function After() {
  const navigate = useNavigate()
  const kakaoToken = useMemo(
    () => JSON.parse(window.localStorage.getItem('kakaoToken')),
    []
  )

  useEffect(() => {
    const { access_token } = kakaoToken

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_APP_KEY)
    }

    if (window.Kakao.isInitialized()) {
      window.Kakao.Auth.setAccessToken(access_token, false)
    }

    postKakaoAccessToken(kakaoToken)

    return () => {
      if (window.Kakao.isInitialized()) {
        window.Kakao.cleanup()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function postKakaoAccessToken(kakaoToken) {
    try {
      const { data } = await axios.post(
        SERVER_DOMAIN_URL + '/api/v1/kakao/try_login',
        kakaoToken,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log({ data })
      if (data !== 'OK') {
        navigate(
          window.location.pathname + '/../' + paths.login.kakaoDevSdk.before
        )
      }
    } catch (error) {
      console.error({ loc: window.location.pathname, error })
    }
  }

  return (
    <div>
      <MarginedDiv>
        <h2>{title}</h2>
      </MarginedDiv>
      <div>
        <MarginedDiv>
          <PaddedButton
            onClick={() => {
              window.Kakao.Auth.logout(() => {
                window.localStorage.removeItem('kakaoToken')
                navigate(
                  window.location.pathname +
                    '/../' +
                    paths.login.kakaoDevSdk.before
                )
              })
            }}
          >
            {buttonsText.kakaoLogout}
          </PaddedButton>
        </MarginedDiv>
        <MarginedDiv>
          <PaddedButton
            onClick={async () => {
              try {
                const { data } = await axios.post(
                  SERVER_DOMAIN_URL + '/api/v1/kakao/unlink',
                  kakaoToken,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                )
                if (data === 'OK') {
                  window.localStorage.removeItem('kakaoToken')
                  navigate(
                    window.location.pathname +
                      '/../' +
                      paths.login.kakaoDevSdk.before
                  )
                  return
                }
                console.error({ data })
              } catch (error) {
                console.error(error)
              }
            }}
          >
            {buttonsText.kakaoUnlink}
          </PaddedButton>
        </MarginedDiv>
      </div>
    </div>
  )
}

export default After
