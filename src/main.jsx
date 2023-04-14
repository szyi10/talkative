import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { AuthContextProvider } from "./context/auth-context"
import { UserContextProvider } from "./context/user-context"
import { ToastContextProvider } from "./context/toast-context"

import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
)
