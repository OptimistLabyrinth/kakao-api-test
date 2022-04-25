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
            <Route path={paths.login.reactKakaoLogin} element={<Login.ReactKakaoLogin />}></Route>
            <Route path={paths.login.kakaoDevSdk} element={<Login.KakaoDevSdk />}></Route>
          </Route>
          <Route path={'*'} element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
