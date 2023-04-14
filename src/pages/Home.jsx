import React, { useEffect } from "react"
import useHttp from "../hooks/use-http"
import { getAllPosts } from "../lib/api"

import Spinner from "../components/layout/Spinner"
import Posts from "../components/posts/Posts"

const Home = () => {
  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true)

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
    return <p>No Posts Found.</p>
  }

  return <Posts data={loadedPosts} />
}

export default Home
