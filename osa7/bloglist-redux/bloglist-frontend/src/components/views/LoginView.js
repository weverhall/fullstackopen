import React from 'react'
import LoginForm from '../LoginForm'

const LoginView = ({ handleLogin }) => {
  return (
    <div>
      <h2>blogs application login</h2>
      <LoginForm login={handleLogin} />
    </div>
  )
}

export default LoginView
