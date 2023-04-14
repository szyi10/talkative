import { useState, createContext } from "react"
import { retrieveStoredToken } from "../lib/auth"
import { getUserData } from "../lib/api"

const UserContext = createContext({
  bio: "",
  displayName: "",
  image: "",
  location: "",
  setUser: (userData) => {},
})

export const UserContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken()
  let initialId

  const [bio, setBio] = useState("")
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [location, setLocation] = useState("")

  const setUser = (data) => {
    setBio(data.bio)
    setName(data.displayName)
    setImg(data.image)
    setLocation(data.location)
  }

  if (tokenData) {
    initialId = tokenData.localId

    getUserData(initialId).then((data) => {
      setUser(data[0].details)
    })
  }

  const contextValue = {
    bio,
    displayName: name,
    image: img,
    location,
    setUser,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserContext
