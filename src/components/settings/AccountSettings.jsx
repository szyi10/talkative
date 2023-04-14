import React, { useRef, useContext } from "react"
import AuthContext from "../../context/auth-context"
import ToastContext from "../../context/toast-context"
import { changePassword } from "../../lib/auth"

const AccountSettings = () => {
  const authCtx = useContext(AuthContext)
  const toastCtx = useContext(ToastContext)

  const passwordRef = useRef()
  const repeatedPasswordRef = useRef()

  const submitPasswordChange = (e) => {
    e.preventDefault()

    const enteredPassword = passwordRef.current.value
    const repeatedPassword = repeatedPasswordRef.current.value

    if (enteredPassword.length >= 6) {
      if (enteredPassword === repeatedPassword) {
        changePassword(authCtx.token, enteredPassword)
        toastCtx.setIsVisible("Password changed.", "success")
      } else {
        toastCtx.setIsVisible("Passwords are not same!", "error")
      }
    } else {
      toastCtx.setIsVisible("Too short password!", "error")
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Your Account</h3>
      <div className="collapse bg-white rounded-xl shadow-sm dark:bg-neutral-800">
        <input type="checkbox" />
        <div className="collapse-title text-lg">
          <i className="bx bx-lock-alt"></i> Change your password
        </div>
        <div className="collapse-content text-base mt-2">
          <form onSubmit={submitPasswordChange}>
            <div className="form-control">
              <label className="label">
                <span>New Password</span>
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="newpasword"
                className="input bg-gray-100 dark:bg-neutral-700 dark:placeholder:text-neutral-400"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Repeat New Password</span>
              </label>
              <input
                ref={repeatedPasswordRef}
                type="password"
                placeholder="newpasword"
                className="input bg-gray-100 dark:bg-neutral-700 dark:placeholder:text-neutral-400"
              />
            </div>
            <button className="btn btn-primary mt-4">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
