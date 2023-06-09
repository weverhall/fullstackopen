import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    notification.content &&
    <div style={style}>
      {notification.message} {notification.content}
    </div>
  )
}

export default Notification