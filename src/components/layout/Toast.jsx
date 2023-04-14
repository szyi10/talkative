import React, { useContext } from "react"
import ToastContext from "../../context/toast-context"

const Toast = () => {
  const toastCtx = useContext(ToastContext)

  return (
    <div
      className={`transition-opacity ${
        toastCtx.isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="toast">
        <div className={`alert alert-${toastCtx.type}`}>
          <div>{toastCtx.message}</div>
        </div>
      </div>
    </div>
  )
}

export default Toast
