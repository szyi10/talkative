import React, { useRef, useContext } from "react"
import { addPost } from "../../lib/api"
import AuthContext from "../../context/auth-context"
import ToastContext from "../../context/toast-context"

const NewPostModal = () => {
  const authCtx = useContext(AuthContext)
  const toastCtx = useContext(ToastContext)

  const titleRef = useRef()
  const descriptionRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredTitle = titleRef.current.value
    const enteredDescription = descriptionRef.current.value

    if (enteredTitle === "" || enteredDescription === "") {
      toastCtx.setIsVisible("Write some text.", "error")
      return
    }

    addPost({
      authorId: authCtx.localId,
      title: enteredTitle,
      text: enteredDescription,
    })

    toastCtx.setIsVisible("Post added.")
  }

  return (
    <>
      <input type="checkbox" id="new-post-modal" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal">
        <form
          className="modal-box relative bg-white dark:bg-neutral-800"
          onSubmit={submitHandler}
        >
          <h3 className="text-xl font-display font-semibold">New Post</h3>
          <div className="divider"></div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              className="input bg-gray-100 dark:bg-neutral-700"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              ref={descriptionRef}
              className="textarea bg-gray-100 dark:bg-neutral-700"
            ></textarea>
          </div>

          <div className="modal-action">
            <button type="button">
              <label htmlFor="new-post-modal" className="btn btn-ghost">
                Close
              </label>
            </button>
            <button type="submit">
              <label htmlFor="new-post-modal" className="btn btn-primary">
                Add
              </label>
            </button>
          </div>
        </form>
      </label>
    </>
  )
}

export default NewPostModal
