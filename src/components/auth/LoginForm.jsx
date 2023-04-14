import React, { useRef, useContext } from "react"
import { fetchUser } from "../../lib/auth"
import { useNavigate, Link } from "react-router-dom"
import AuthContext from "../../context/auth-context"
import ToastContext from "../../context/toast-context"

const LoginForm = ({ changeForm }) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const authCtx = useContext(AuthContext)
  const toastCtx = useContext(ToastContext)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    const enteredUser = {
      email: enteredEmail,
      password: enteredPassword,
    }

    fetchUser("login", enteredUser)
      .then((data) => {
        toastCtx.setIsVisible("Logged In!", "success")
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        )
        authCtx.login(data.idToken, expirationTime.toISOString(), data.localId)
        navigate("/")
        window.location.reload()
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <form
      className="max-w-lg mx-auto space-y-4 px-6 py-8 rounded-xl shadow bg-white dark:bg-neutral-800"
      onSubmit={submitHandler}
    >
      <h2 className="font-display font-bold text-3xl">Login</h2>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          ref={emailRef}
          type="text"
          required
          className="input bg-gray-100 dark:bg-neutral-700"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          ref={passwordRef}
          type="password"
          required
          className="input bg-gray-100 dark:bg-neutral-700"
        />
      </div>

      <div className="divider"></div>

      <div className="space-y-2 flex flex-col items-center">
        <div className="flex justify-between items-center w-full gap-x-3">
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={changeForm}
          >
            Register
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Login
          </button>
        </div>
        <p>
          Forget your{" "}
          <Link
            to="/reset"
            href="#"
            className="text-accent transition-colors hover:text-accent-focus"
          >
            password
          </Link>
          ?
        </p>
      </div>
    </form>
  )
}

export default LoginForm
