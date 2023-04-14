import React, { useContext } from "react"
import AuthContext from "../../context/auth-context"

import AccountSettings from "./AccountSettings"
import DisplaySettings from "./DisplaySettings"

const Settings = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <section className="flex-1 space-y-4">
      <h2 className="font-display font-bold text-3xl">Settings</h2>
      {isLoggedIn && <AccountSettings />}
      <DisplaySettings />
    </section>
  )
}

export default Settings
