import React, { useRef, useEffect, useContext } from "react"
import useHttp from "../../hooks/use-http"
import AuthContext from "../../context/auth-context"
import UserContext from "../../context/user-context"
import ToastContext from "../../context/toast-context"
import { getUserData, updateUserData } from "../../lib/api"
import Spinner from "./Spinner"

const EditProfileModal = () => {
  const {
    sendRequest,
    status,
    data: loadedUser,
    error,
  } = useHttp(getUserData, true)

  const authCtx = useContext(AuthContext)
  const { bio, displayName, image, location } = useContext(UserContext)
  const toastCtx = useContext(ToastContext)

  const imgRef = useRef()
  const nameRef = useRef()
  const bioRef = useRef()
  const locationRef = useRef()

  useEffect(() => {
    sendRequest(authCtx.localId)
  }, [sendRequest])

  if (status === "pending") {
    return <Spinner />
  }

  if (error) {
    return <p>{error}</p>
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredImg = imgRef.current?.value
    const eneteredName = nameRef.current?.value
    const enteredBio = bioRef.current?.value
    const enteredLocation = locationRef.current?.value

    const enteredData = {
      image: enteredImg.length > 0 ? enteredImg : image,
      displayName: eneteredName.length > 0 ? eneteredName : displayName,
      bio: enteredBio.length > 0 ? enteredBio : bio,
      location: enteredLocation.length > 0 ? enteredLocation : location,
    }

    const userData = {
      email: loadedUser[0].email,
      localId: loadedUser[0].localId,
    }

    updateUserData(userData, loadedUser[0].id, enteredData)
    toastCtx.setIsVisible("Profile updated.")
  }

  return (
    <>
      <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal">
        <form
          className="modal-box relative bg-white dark:bg-neutral-800"
          onSubmit={submitHandler}
        >
          <h3 className="text-xl font-display font-semibold">Edit Profile</h3>
          <div className="divider"></div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              ref={imgRef}
              type="text"
              placeholder={image}
              className="input bg-gray-100 dark:bg-neutral-700"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nickname</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder={displayName}
              className="input bg-gray-100 dark:bg-neutral-700"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <input
              ref={bioRef}
              type="text"
              placeholder={bio}
              className="input bg-gray-100 dark:bg-neutral-700"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              ref={locationRef}
              type="text"
              placeholder={location}
              className="input bg-gray-100 dark:bg-neutral-700"
            />
          </div>

          <div className="modal-action">
            <button type="button">
              <label htmlFor="edit-profile-modal" className="btn btn-ghost">
                Close
              </label>
            </button>
            <button type="submit">
              <label htmlFor="edit-profile-modal" className="btn btn-primary">
                Save
              </label>
            </button>
          </div>
        </form>
      </label>
    </>
  )
}

export default EditProfileModal
