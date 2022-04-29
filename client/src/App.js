import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import paths from './paths'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={paths.home} element={<Home />}></Route>
          <Route path={paths.login.home} element={<Outlet />}>
            <Route index={true} element={<Login.Home />}></Route>
            <Route path={paths.login.kakaoDevSdk.before} element={<Login.KakaoDevSdk.Before />}></Route>
            <Route path={paths.login.kakaoDevSdk.redirect} element={<Login.KakaoDevSdk.Redirect />}></Route>
            <Route path={paths.login.kakaoDevSdk.after} element={<Login.KakaoDevSdk.After />}></Route>
            <Route path={paths.login.kakaoRestApi.before} element={<Login.KakaoRestApi.Before />}></Route>
            <Route path={paths.login.kakaoRestApi.redirect} element={<Login.KakaoRestApi.Redirect />}></Route>
            <Route path={paths.login.kakaoRestApi.after} element={<Login.KakaoRestApi.After />}></Route>
          </Route>
          <Route path={'*'} element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
