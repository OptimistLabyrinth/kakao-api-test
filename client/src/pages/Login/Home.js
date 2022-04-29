import { useNavigate } from 'react-router-dom'
import MarginedDiv from '../../components/MarginedDiv'
import PaddedButton from '../../components/PaddedButton'
import paths from '../../paths'

const title = '카카오로 로그인하기'

const buttonsText = {
  devSdk: 'https://developers.kakao.com/ SDK 소스 코드 사용하기',
  restApi: 'REST API 요청으로 처리하기',
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
              navigate(paths.login.kakaoDevSdk.before)
            }}
          >
            {buttonsText.devSdk}
          </PaddedButton>
        </MarginedDiv>
      </div>
      <div>
        <MarginedDiv>
          <PaddedButton
            onClick={() => {
              navigate(paths.login.kakaoRestApi.before)
            }}
          >
            {buttonsText.restApi}
          </PaddedButton>
        </MarginedDiv>
      </div>
    </div>
  )
}

export default Home
