import React from "react"

import Navbar from "./navigation/Navbar"
import DesktopMenu from "./navigation/DesktopMenu"
import MobileMenu from "./navigation/MobileMenu"
import EditProfileModal from "./EditProfileModal"
import NewPostModal from "./NewPostModal"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="relative max-w-screen-xl flex mx-auto mt-4 px-2 md:mt-8 md:px-7">
        <DesktopMenu />
        <MobileMenu />
        {children}
      </main>
      <EditProfileModal />
      <NewPostModal />
    </>
  )
}

export default Layout
