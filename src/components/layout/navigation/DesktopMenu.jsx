import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../../context/auth-context"

const DesktopMenu = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <div className="w-56 hidden md:flex">&nbsp;</div>
      <aside className="fixed w-56 pr-6 top-50 left-50 -translate-x-50 hidden md:flex flex-col">
        <ul className="space-y-2 dark:text-neutral-300">
          <li>
            <Link
              to="/"
              className="btn btn-ghost text-xl normal-case font-normal w-full justify-start"
            >
              <i className="bx bx-home-alt-2 mr-2"></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/my-topics"
              className="btn btn-ghost text-xl normal-case font-normal w-full justify-start"
            >
              <i className="bx bx-book-open mr-2"></i>
              My Topics
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="btn btn-ghost text-xl normal-case font-normal w-full justify-start"
            >
              <i className="bx bx-user mr-2"></i>
              Profile
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <label
                htmlFor="new-post-modal"
                className="btn btn-md rounded-xl btn-primary w-full mt-4"
              >
                <i className="bx bx-plus mr-1"></i>New Post
              </label>
            </li>
          )}
        </ul>
      </aside>
    </>
  )
}

export default DesktopMenu
