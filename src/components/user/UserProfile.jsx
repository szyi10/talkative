import React, { useContext } from "react"
import UserContext from "../../context/user-context"

const UserProfile = ({ data }) => {
  const { bio, displayName, image, location } = useContext(UserContext)

  return (
    <section className="flex-1">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between mt-2">
        <div className="flex flex-col md:items-stretch space-y-6 gap-x-6 md:space-y-0 md:flex-row">
          <img
            src={image ? image : ""}
            className="rounded-xl w-48 h-48 self-center md:self-start object-cover"
          />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <h3 className="font-display font-semibold text-3xl">
                {displayName ? displayName : data[0].email}
              </h3>
              <span className="text-neutral-500 text-sm -mt-1 mb-4">
                {data[0].email}
              </span>
              <p className="text-lg">{bio}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-4 text-neutral-500">
                {location && (
                  <p>
                    <i className="bx bx-current-location"></i> {location}
                  </p>
                )}
                <p>
                  <i className="bx bx-calendar"></i> Joined February 2023
                </p>
              </div>
              <div className="flex gap-x-4">
                <p>Posts: {data[0].posts?.length || 0}</p>
                <p>Likes: {data[0].likes || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <label
          htmlFor="edit-profile-modal"
          className="self-start btn btn-primary"
        >
          Edit Profile
        </label>
      </div>
    </section>
  )
}

export default UserProfile
