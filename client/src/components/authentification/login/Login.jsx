import React from 'react'
import { useState } from 'react'
import './login.css'
import Input from '../../UI/input/Input'
import { login } from '../../../actions/user'
import { useDispatch } from 'react-redux'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  return (
    <div className="login">
      <div className="login__header">Вход</div>
      <div className="login"></div>
      <div className="login__input_name">Электронная почта</div>
      <div className="login__input">
        <Input className="auth" value={email} setValue={setEmail} type="email" placeholder="email@example.com" />{' '}
      </div>
      <div className="login__input_name">Пароль</div>
      <div className="login__input">
        <Input className="auth" value={password} setValue={setpassword} type="password" placeholder="********" />{' '}
      </div>
      <button
        className="login__button"
        onClick={() => {
          dispatch(login(email, password))
          props.sVisible(false)
        }}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
