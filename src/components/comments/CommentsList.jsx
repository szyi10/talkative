import React from "react"
import CommentItem from "./CommentItem"

const CommentsList = ({ data }) => {
  return (
    <>
      {data.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}

export default CommentsList
