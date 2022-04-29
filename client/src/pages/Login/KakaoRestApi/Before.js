import MarginedDiv from '../../../components/MarginedDiv'
import { KAKAO_REST_API_APP_KEY } from '../../../constants'
import paths from '../../../paths'

const title = 'REST API 요청으로 처리하기'

const buttonsText = {
  login: '카카오 로그인',
}

function Before() {
  return (
    <div>
      <MarginedDiv>
        <h2>{title}</h2>
      </MarginedDiv>
      <MarginedDiv>
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_APP_KEY}&redirect_uri=${
            window.origin +
            paths.home +
            paths.login.home +
            '/' +
            paths.login.kakaoRestApi.redirect
          }&response_type=code`}
        >
          {buttonsText.login}
        </a>
      </MarginedDiv>
    </div>
  )
}

export default Before
