import React, { useState, useEffect } from "react"

const DisplaySettings = () => {
  const [isChecked, setIsChecked] = useState(undefined)

  const resetStorage = (theme) => {
    localStorage.removeItem("theme")
    localStorage.setItem("theme", theme)
  }

  const toggleTheme = () => {
    if (localStorage.theme === "light") {
      resetStorage("dark")
      document.documentElement.classList.add("dark")
      return
    }

    if (localStorage.theme === "dark") {
      resetStorage("light")
      document.documentElement.classList.remove("dark")
      return
    }
  }

  useEffect(() => {
    if (localStorage.theme === "light") {
      setIsChecked(false)
    }

    if (localStorage.theme === "dark") {
      setIsChecked(true)
    }
  }, [])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Display</h3>
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={toggleTheme}
            className="checkbox checkbox-primary bg-white dark:bg-neutral-800"
          />
          <span className="text-lg">Dark Theme</span>
        </label>
      </div>
    </div>
  )
}

export default DisplaySettings
