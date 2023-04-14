import React from "react"

import spinner from "../../assets/spinner.svg"

const Spinner = () => {
  return (
    <img src={spinner} className="w-24 absolute left-1/2 -translate-x-1/2" />
  )
}

export default Spinner
