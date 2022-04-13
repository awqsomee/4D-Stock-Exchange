import React from 'react'
import { useState } from 'react'
import './registration.css'
import Input from '../../utils/input/Input'
import { registration } from '../../actions/user'
import close from '../../assets/image/close.svg'
import '../../utils/input/input.css'

const Registration = (props) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <div className="registration__close">
        {' '}
        <img src={close} alt="close_img" className="close_img" />{' '}
      </div>
      Имя
      <Input value={name} setValue={setName} type="text" placeholder="Иван" />
      Фамилия
      <Input value={surname} setValue={setSurname} type="text" placeholder="Иванов" />
      Электронная почта
      <Input value={email} setValue={setEmail} type="email" placeholder="email@example.com" />
      Придумайте пароль
      <Input value={password} setValue={setPassword} type="password" placeholder="********" />
      Повторите пароль
      <Input
        className="authInput"
        value={repeatPassword}
        setValue={setRepeatPassword}
        type="password"
        placeholder="********"
      />
      <button
        className="registration__button"
        onClick={() => {
          if (password === repeatPassword) {
            registration(name, surname, email, password)
            props.sVisible(false)
          }
        }}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Registration
