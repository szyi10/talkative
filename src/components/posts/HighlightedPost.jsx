import React, { useEffect, useState } from "react"
import { getUserData } from "../../lib/api"

const HighlightedPost = ({ data }) => {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    getUserData(data.authorId).then((data) => {
      const user = data[0].details

      if (user.displayName.length > 0) {
        setName(user.displayName)
      } else {
        setName(data[0].email)
      }

      if (user.image.length > 0) {
        setImage(user.image)
      } else {
        setImage(
          "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        )
      }
    })
  }, [])

  return (
    <div className="w-full flex flex-col space-y-3 divide-y divide-gray-100 bg-white rounded-xl px-6 py-8 shadow dark:bg-neutral-800 dark:divide-neutral-700">
      <div className="text-sm transition-colors label-text flex items-center gap-2">
        <img src={image} className="w-5 h-5 rounded-full" />
        Posted by {name}
      </div>
      <div className="py-2">
        <h2 className="pb-1 pt-2 text-2xl font-display font-bold transition-colors text-neutral-800 dark:text-white">
          {data.title}
        </h2>
        <p className="text-md text-neutral-600 leading-7 dark:text-neutral-300">
          {data.text}
        </p>
      </div>
      <div className="flex space-x-3 pt-3">
        <button className="text-neutral-600 cursor-pointer transition-colors hover:text-green-500 dark:text-neutral-400 dark:hover:text-green-500">
          <i className="bx bx-like"></i> {data.likes || 0}
        </button>
        <button className="text-neutral-600 cursor-pointer transition-colors hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-500">
          <i className="bx bx-dislike"></i> {data.dislikes || 0}
        </button>
      </div>
    </div>
  )
}

export default HighlightedPost
