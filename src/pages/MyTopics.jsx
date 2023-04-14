import React, { useEffect, useContext } from "react"
import useHttp from "../hooks/use-http"
import { getAllPosts } from "../lib/api"
import AuthContext from "../context/auth-context"

import Spinner from "../components/layout/Spinner"
import Posts from "../components/posts/Posts"

const MyTopics = () => {
  const { localId } = useContext(AuthContext)

  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true) // getUsersPosts

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === "pending") {
    return <Spinner />
  }

  if (error) {
    return <p>{error}</p>
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return <p className="flex-1">No Posts Found.</p>
  }

  return (
    <Posts data={loadedPosts.filter((post) => post.authorId === localId)} />
  )
}

export default MyTopics
