import React, { useRef, useContext } from "react"
import { fetchUser } from "../../lib/auth"
import ToastContext from "../../context/toast-context"

const RegisterForm = ({ changeForm, onAddUser }) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const repeatedPasswordRef = useRef()

  const toastCtx = useContext(ToastContext)

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value
    const enteredRepeatedPassword = repeatedPasswordRef.current.value

    if (enteredPassword !== enteredRepeatedPassword) return

    const enteredUser = {
      email: enteredEmail,
      password: enteredPassword,
    }

    fetchUser("register", enteredUser).then((data) => {
      onAddUser({
        localId: data.localId,
        email: data.email,
        details: {
          bio: "",
          displayName: "",
          image:
            "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          location: "",
        },
      })
    })

    toastCtx.setIsVisible("Account Created!", "success")
  }

  return (
    <form
      className="max-w-lg mx-auto space-y-4 px-6 py-8 rounded-xl shadow bg-white dark:bg-neutral-800"
      onSubmit={submitHandler}
    >
      <h2 className="font-display font-bold text-3xl">Register</h2>

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

      <div className="form-control">
        <label className="label">
          <span className="label-text">Repeat Password</span>
        </label>
        <input
          ref={repeatedPasswordRef}
          type="password"
          required
          className="input bg-gray-100 dark:bg-neutral-700"
        />
      </div>

      <div className="divider"></div>

      <div className="flex justify-between items-center w-full gap-x-3">
        <button
          type="button"
          className="btn btn-ghost flex-1"
          onClick={changeForm}
        >
          Login
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          Register
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
