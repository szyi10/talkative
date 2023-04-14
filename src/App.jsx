import React, { lazy, Suspense, useEffect, useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import AuthContext from "./context/auth-context"

import Spinner from "./components/layout/Spinner"
import Layout from "./components/Layout/Layout"
import Toast from "./components/layout/Toast"

const Comments = lazy(() => import("./components/comments/Commnets"))

const Home = lazy(() => import("./pages/Home"))
const PostDetail = lazy(() => import("./pages/PostDetail"))
const MyTopics = lazy(() => import("./pages/MyTopics"))
const AuthPage = lazy(() => import("./pages/AuthPage"))
const Profile = lazy(() => import("./pages/Profile"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"))
const ResetPage = lazy(() => import("./pages/ResetPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

const App = () => {
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light")
    }

    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<PostDetail />}>
              <Route path="" element={<Comments />} />
            </Route>
            <Route
              path="/my-topics"
              element={isLoggedIn ? <MyTopics /> : <Navigate to="/auth" />}
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toast />
    </>
  )
}

export default App
