import { useState, useCallback, useEffect, createContext } from "react"
import { calculateRemainingTime, retrieveStoredToken } from "../lib/auth"

let logoutTimer

const AuthContext = createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken()
  let initialToken, initialId

  if (tokenData) {
    initialToken = tokenData.token
    initialId = tokenData.localId
  }

  const [token, setToken] = useState(initialToken)
  const [id, setId] = useState(initialId)
  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)

    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")
    localStorage.removeItem("localId")

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime, id) => {
    setToken(token)
    setId(id)

    localStorage.setItem("token", token)
    localStorage.setItem("expirationTime", expirationTime)
    localStorage.setItem("localId", id)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token: token,
    localId: id,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
