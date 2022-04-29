import { useNavigate } from 'react-router-dom'
import MarginedDiv from '../../components/MarginedDiv'
import PaddedButton from '../../components/PaddedButton'
import paths from '../../paths'

const title = '카카오 API / SDK 사용하기'

const buttonLogin = {
  text: '로그인하기',
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
              navigate(paths.login.home)
            }}
          >
            {buttonLogin.text}
          </PaddedButton>
        </MarginedDiv>
      </div>
    </div>
  )
}

export default Home
