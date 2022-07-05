import React from 'react'
import { useState } from 'react'
import './registration.css'
import Input from '../../UI/input/Input'
import { registration } from '../../../actions/user'
import '../../UI/input/input.css'
import ModalBoxDeposit from '../../UI/ModalBox/ModalBoxDeposit'

const Registration = (props) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  return (
    <div className="registration">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
        <div className="reg_pop_up">
          <div>Не удалось зарегистрироваться. Проверьте корректность данных</div>
        </div>
      </ModalBoxDeposit>

      <div className="registration__header">Регистрация</div>
      <div className="registration__input_name">Имя</div>
      <div className="registration__input">
        <Input className="auth" value={name} setValue={setName} type="text" placeholder="Иван" />{' '}
      </div>
      <div className="registration__input_name">Фамилия</div>
      <div className="registration__input">
        <Input className="auth" value={surname} setValue={setSurname} type="text" placeholder="Иванов" />{' '}
      </div>
      <div className="registration__input_name">Электронная почта</div>
      <div className="registration__input">
        <Input className="auth" value={email} setValue={setEmail} type="email" placeholder="email@example.com" />{' '}
      </div>
      <div className="registration__input_name">Придумайте пароль</div>
      <div className="registration__input">
        <Input className="auth" value={password} setValue={setPassword} type="password" placeholder="********" />{' '}
      </div>
      <div className="registration__input_name">Повторите пароль</div>
      <div className="registration__input">
        <Input
          className="auth"
          value={repeatPassword}
          setValue={setRepeatPassword}
          type="password"
          placeholder="********"
        />{' '}
      </div>
      <button
        className="button button__normal registration__button"
        onClick={() => {
          if (password === repeatPassword) {
            registration(name, surname, email, password)

            props.sVisible(false)
          } else setmodalBoxDeposit(true)
        }}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Registration
