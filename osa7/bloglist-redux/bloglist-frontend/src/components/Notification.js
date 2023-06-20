const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: notification.error ? 'red' : 'green'
  }

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
