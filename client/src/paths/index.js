const paths = {
  home: '/',
  login: {
    home: 'login',
    kakaoDevSdk: {
      before: 'kakao-dev-sdk-before',
      redirect: 'kakao-dev-sdk-redirect',
      after: 'kakao-dev-sdk-after',
    },
    kakaoRestApi: {
      before: 'kakao-rest-api-before',
      redirect: 'kakao-rest-api-redirect',
      after: 'kakao-rest-api-after',
    },
  },
}

export default paths
