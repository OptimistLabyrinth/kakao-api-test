import { useNavigate } from 'react-router-dom'
import MarginedDiv from '../../components/MarginedDiv'
import PaddedButton from '../../components/PaddedButton'
import paths from '../../paths'

const title = '카카오로 로그인하기'

const buttonReactKakaoLogin = {
  text: 'react-kakao-login 패키지 사용하기',
}

const buttonKakaoDevSdk = {
  text: 'https://developers.kakao.com/ SDK 소스 코드 사용하기',
}

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <MarginedDiv>
        <h2>{title}</h2>
      </MarginedDiv>
      <div>
        <MarginedDiv>
          <PaddedButton
            onClick={() => {
              navigate(paths.login.reactKakaoLogin)
            }}
          >
            {buttonReactKakaoLogin.text}
          </PaddedButton>
        </MarginedDiv>
        <MarginedDiv>
          <PaddedButton
            onClick={() => {
              navigate(paths.login.kakaoDevSdk)
            }}
          >
            {buttonKakaoDevSdk.text}
          </PaddedButton>
        </MarginedDiv>
      </div>
    </div>
  )
}

export default Home
