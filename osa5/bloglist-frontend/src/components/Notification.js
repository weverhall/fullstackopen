import React from 'react'

const Notification = ({ message, error }) => (
  message === null ? null : (
    <div className={error ? 'error' : 'notification'}>
      {message}
    </div>
  )
)

export default Notification