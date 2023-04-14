export async function fetchUser(type, user) {
  let url

  if (type === "login") {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA"
  }

  if (type === "register") {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA"
  }

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Authentication failed!"

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }

  return data
}

export const changePassword = async (token, password) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: password,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Password change failed."

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }
}

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjustedExpTime = new Date(expirationTime).getTime()

  const remainingTime = adjustedExpTime - currentTime

  return remainingTime
}

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token")
  const storedExpirationTime = localStorage.getItem("expirationTime")
  const localId = localStorage.getItem("localId")

  const remainingTime = calculateRemainingTime(storedExpirationTime)

  if (remainingTime <= 60000) {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")
    localStorage.removeItem("localId")
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
    localId,
  }
}
