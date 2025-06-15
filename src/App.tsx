import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import { useEffect, useState } from "react"
import authService from "./service/AuthService"
import { useStores } from "./provider/MobxProvider"
import { Spin } from "antd"
import VerifyEmailCodePage from "./pages/verifyEmailCode/VerifyEmailCodePage"
import RegistrationPage from "./pages/registration/RegistrationPage"

function App() {

  const [loading, setLoading] = useState(true)

  const {
    authStore
  } = useStores()

  useEffect(() => {
    authService.refresh().then((data) => {
      authStore.setUser(data.user)
      authStore.setAuth(true)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])


  return (
    loading ? <div className="loader">
      <Spin size="large" />
    </div> :
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="verify-email-code/:email" element={<VerifyEmailCodePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
