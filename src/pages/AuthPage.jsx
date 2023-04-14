import React, { useState } from "react"
import useHttp from "../hooks/use-http"
import { addUser } from "../lib/api"

import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState("login")

  const { sendRequest } = useHttp(addUser)

  const changeToLogin = () => {
    setCurrentForm("login")
  }

  const changeToRegister = () => {
    setCurrentForm("register")
  }

  const addUserHandler = (userData) => {
    sendRequest(userData)
  }

  return (
    <div className="flex-1">
      {currentForm === "login" && <LoginForm changeForm={changeToRegister} />}
      {currentForm === "register" && (
        <RegisterForm changeForm={changeToLogin} onAddUser={addUserHandler} />
      )}
    </div>
  )
}

export default AuthPage
