import React, { useEffect, useContext } from "react"
import useHttp from "../hooks/use-http"
import AuthContext from "../context/auth-context"
import { getAllPosts, getUserData } from "../lib/api"

import Spinner from "../components/layout/Spinner"
import UserProfile from "../components/user/UserProfile"

const Profile = () => {
  const {
    sendRequest,
    status,
    data: loadedUser,
    error,
  } = useHttp(getUserData, true)

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    sendRequest(authCtx.localId)
  }, [sendRequest])

  if (status === "pending") {
    return <Spinner />
  }

  if (error) {
    return <p>{error}</p>
  }

  if (status === "completed" && !loadedUser) {
    return <p>No User Found.</p>
  }

  return <UserProfile data={loadedUser} />
}

export default Profile
