import React from 'react'
import { useState } from 'react'
import './login.css'
import Input from '../../utils/input/Input'
import { login } from '../../actions/user'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div className="login">
      <div className="login"></div>
      <Input value={email} setValue={setEmail} type="email" placeholder="email@example.com" />
      <Input value={password} setValue={setpassword} type="password" placeholder="********" />
      <button
        className="login__button"
        onClick={() => {
          login(email, password)
          props.sVisible(false)
        }}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
