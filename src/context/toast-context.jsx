import { useState, createContext } from "react"

const ToastContext = createContext({
  isVisible: false,
  type: "",
  message: "",
  setIsVisible: (message, type) => {},
})

export const ToastContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [type, setType] = useState("info")
  const [message, setMessage] = useState("")

  const changeVisibilityHandler = (message, type) => {
    setIsVisible(true)
    setType(type)
    setMessage(message)

    setTimeout(() => {
      setIsVisible(false)
    }, 2500)
  }

  const contextValue = {
    isVisible,
    type,
    message,
    setIsVisible: changeVisibilityHandler,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext
