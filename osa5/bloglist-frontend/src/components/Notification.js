import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={error ? "error" : "notification"}>
        {message}
      </div>
  )}
}

export default Notification