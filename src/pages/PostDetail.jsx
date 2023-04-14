import React, { useEffect } from "react"
import { useParams, Outlet } from "react-router-dom"
import useHttp from "../hooks/use-http"
import { getSinglePost } from "../lib/api"

import Spinner from "../components/layout/Spinner"
import HighlightedPost from "../components/posts/HighlightedPost"

const PostDetail = () => {
  const { postId } = useParams()

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true)

  useEffect(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  if (status === "pending") {
    return <Spinner />
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!loadedPost.text) {
    return <p>No qoute found!</p>
  }

  return (
    <div className="flex flex-col gap-y-4 mt-4 flex-1">
      <HighlightedPost data={loadedPost} />
      <Outlet />
    </div>
  )
}

export default PostDetail
