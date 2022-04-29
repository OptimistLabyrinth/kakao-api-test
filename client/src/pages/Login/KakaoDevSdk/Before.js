import { useEffect } from 'react'
import MarginedDiv from '../../../components/MarginedDiv'
import PaddedButton from '../../../components/PaddedButton'
import { KAKAO_JAVASCRIPT_APP_KEY } from '../../../constants/index'
import paths from '../../../paths'

const title = 'developers.kakao.com 에서 다운로드 한 SDK 사용하기'

const buttonsText = {
  login: '카카오 로그인',
}

function Before() {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_APP_KEY)
    }

    return () => {
      if (window.Kakao.isInitialized()) {
        window.Kakao.cleanup()
      }
    }
  }, [])

  return (
    <div>
      <MarginedDiv>
        <h2>{title}</h2>
      </MarginedDiv>
      <MarginedDiv>
        <PaddedButton
          onClick={() => {
            try {
              window.Kakao.Auth.authorize({
                redirectUri:
                  window.origin +
                  paths.home +
                  paths.login.home +
                  '/' +
                  paths.login.kakaoDevSdk.redirect,
              })
            } catch (error) {
              console.error(error)
            }
          }}
        >
          {buttonsText.login}
        </PaddedButton>
      </MarginedDiv>
    </div>
  )
}

export default Before
