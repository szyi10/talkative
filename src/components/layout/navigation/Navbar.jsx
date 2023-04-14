import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../../context/auth-context"
import UserContext from "../../../context/user-context"
import ToastContext from "../../../context/toast-context"

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext)
  const { image } = useContext(UserContext)
  const toastCtx = useContext(ToastContext)

  const logoutHandler = () => {
    toastCtx.setIsVisible("Logged Out!", "success")
    logout()
  }

  return (
    <nav className="sticky top-0 bg-white text-gray-800 shadow dark:bg-neutral-800 dark:text-neutral-100 z-10">
      <div className="navbar max-w-screen-xl mx-auto md:px-6 py-4">
        <div className="flex-1">
          <Link to="/" className="normal-case text-3xl font-bold font-display">
            Talkative<span className="text-red-600">.</span>
          </Link>
        </div>
        <div className="flex-none gap-2 ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {isLoggedIn && (
                  <img
                    src={
                      image.length > 0
                        ? image
                        : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                  />
                )}
                {!isLoggedIn && (
                  <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-5 p-2 shadow menu lg:menu-normal dropdown-content bg-base-100 dark:bg-neutral-800 rounded-box w-99 md:w-52"
            >
              <li className="md:hidden">
                <Link to="/" className="items-center">
                  <i className="bx bx-home-alt-2 h-5 w-5"></i>
                  Home
                </Link>
              </li>
              <li className="md:hidden">
                <Link to="/my-topics" className="items-center">
                  <i className="bx bx-book-open h-5 w-5"></i>
                  My Topics
                </Link>
              </li>
              <li>
                <Link to="/profile" className="items-center">
                  <i className="bx bx-user h-5 w-5"></i>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <i className="bx bx-cog"></i>
                  Settings
                </Link>
              </li>
              <li>
                {isLoggedIn && (
                  <a onClick={logoutHandler}>
                    <i className="bx bx-log-out"></i>
                    Logout
                  </a>
                )}
                {!isLoggedIn && (
                  <Link to="/auth">
                    <i className="bx bx-log-in"></i>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
