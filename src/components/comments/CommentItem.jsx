import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserData } from "../../lib/api"

const CommentItem = ({ data }) => {
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
    <div className="border-l border-neutral-300 dark:border-neutral-600">
      <div className="flex items-center gap-x-2 ml-2">
        <img src={image} className="w-5 h-5 rounded-full" />
        <p className="text-accent">{name}</p>
      </div>
      <div className="ml-2">
        <p className="mt-1 text-md text-neutral-600 leading-7 dark:text-neutral-300">
          {data.text}
        </p>
      </div>
    </div>
  )
}

export default CommentItem
