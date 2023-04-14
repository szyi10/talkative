import React from "react"
import PostItem from "./PostItem"

// Sorting posts from latest
const sortPosts = (posts) => {
  return posts.sort((postA, postB) => {
    return postA.id < postB.id ? 1 : -1
  })
}

const Posts = ({ data }) => {
  const sortedPosts = sortPosts(data)

  return (
    <ul className="flex flex-col flex-1 space-y-6 mb-16">
      {sortedPosts.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
    </ul>
  )
}

export default Posts
