import React, { useRef, useEffect, useContext } from "react"
import useHttp from "../../hooks/use-http"
import { addComment } from "../../lib/api"
import AuthContext from "../../context/auth-context"
import ToastContext from "../../context/toast-context"

const CommentForm = ({ onAdd, postId }) => {
  const { sendRequest, status, error } = useHttp(addComment)

  const authCtx = useContext(AuthContext)
  const toastCtx = useContext(ToastContext)

  const commentRef = useRef()

  useEffect(() => {
    if (status === "completed" && !error) {
      onAdd()
    }
  }, [status, error, onAdd])

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredComment = commentRef.current.value

    sendRequest({
      commentData: {
        authorId: authCtx.localId,
        text: enteredComment,
      },
      postId: postId,
    })

    toastCtx.setIsVisible("Comment Added.")
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={submitHandler}>
      <div className="form-control">
        <textarea
          ref={commentRef}
          placeholder="New comment..."
          className="textarea textarea-sm shadow-2xl bg-white dark:bg-neutral-800"
        ></textarea>
      </div>
      <button className="btn btn-sm btn-primary self-end" type="submit">
        Comment
      </button>
    </form>
  )
}

export default CommentForm
