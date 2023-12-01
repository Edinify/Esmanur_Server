import React from 'react'
import { Route } from 'react-router'
import { ForgotPass } from '../Pages/LoginPage/components/ForgotPass/ForgotPass'
import { SendCode } from '../Pages/LoginPage/components/SendCode/SendCode'
import { ChangePass } from '../Pages/LoginPage/components/ChangePass/ChangePass'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'

const LoginRoute = () => {
  return (
    <>
    <Route path="forget" element={<ForgotPass />} />
    <Route path="send" element={<SendCode />} />
    <Route path="change" element={<ChangePass />} />
    <Route path='/error' element={<ErrorPage />} />
    </>
  )
}

export default LoginRoute