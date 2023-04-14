import React, { useContext } from "react"
import AuthContext from "../../../context/auth-context"

const MobileMenu = () => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) return

  return (
    <div className="toast md:hidden">
      <label
        htmlFor="new-post-modal"
        className="btn btn-lg btn-primary aspect-square rounded-full"
      >
        <i className="bx bx-edit-alt text-xl"></i>
      </label>
    </div>
  )
}

export default MobileMenu
