import React, { useEffect, useCallback, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import useHttp from "../../hooks/use-http"
import { getAllComments } from "../../lib/api"
import AuthContext from "../../context/auth-context"

import Spinner from "../layout/Spinner"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"

const Commnets = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const { postId } = useParams()

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  useEffect(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  const addedCommentHandler = useCallback(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  let comments

  if (status === "pending") {
    comments = <Spinner />
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList data={loadedComments} />
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p>No comments were added yet.</p>
  }

  return (
    <section className="flex flex-col flex-1 space-y-6 mb-16">
      <h3 className="text-lg">Comments:</h3>
      {!isLoggedIn && (
        <p className="text-neutral-500">
          To add a comment you have to
          <Link to="/auth" className="text-primary self-start">
            {" "}
            log in
          </Link>
          .
        </p>
      )}
      {isLoggedIn && (
        <CommentForm postId={postId} onAdd={addedCommentHandler} />
      )}
      {comments}
    </section>
  )
}

export default Commnets
