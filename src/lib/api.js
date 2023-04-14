const FIREBASE_URL =
  "https://react-http-a3a7d-default-rtdb.europe-west1.firebasedatabase.app"

export const getAllPosts = async () => {
  const res = await fetch(`${FIREBASE_URL}/posts.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch posts.")
  }

  const transformedPosts = []

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    }

    transformedPosts.push(postObj)
  }

  return transformedPosts
}

export const getSinglePost = async (postId) => {
  const res = await fetch(`${FIREBASE_URL}/posts/${postId}.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch post.")
  }

  const loadedPost = {
    id: postId,
    ...data,
  }

  return loadedPost
}

export const addPost = async (postData) => {
  const res = await fetch(`${FIREBASE_URL}/posts.json`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not create post.")
  }

  return null
}

export const getAllComments = async (postId) => {
  const res = await fetch(`${FIREBASE_URL}/comments/${postId}.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not get comment.")
  }

  const transformedComments = []

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    }

    transformedComments.push(commentObj)
  }

  return transformedComments
}

export const addComment = async (reqData) => {
  const res = await fetch(`${FIREBASE_URL}/comments/${reqData.postId}.json`, {
    method: "POST",
    body: JSON.stringify(reqData.commentData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not add comment.")
  }

  return { commentId: data.name }
}

export const getUserData = async (userId) => {
  const res = await fetch(`${FIREBASE_URL}/users.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch post.")
  }

  const transformedUsers = []

  for (const key in data) {
    const userObj = {
      id: key,
      ...data[key],
    }

    transformedUsers.push(userObj)
  }

  const filteredUser = transformedUsers.filter(
    (user) => user.localId === userId
  )

  return filteredUser
}

export const addUser = async (userData) => {
  const res = await fetch(`${FIREBASE_URL}/users.json`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not create post.")
  }

  return null
}

export const updateUserData = async (userData, userDbId, updateData) => {
  const res = await fetch(`${FIREBASE_URL}/users/${userDbId}.json`, {
    method: "PUT",
    body: JSON.stringify({
      ...userData,
      details: updateData,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not update user.")
  }

  return null
}
