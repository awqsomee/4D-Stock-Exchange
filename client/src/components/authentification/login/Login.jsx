import React from 'react'
import { useState } from 'react'
import './login.css'
import Input from '../../UI/input/Input'
import { login } from '../../../actions/user'
import { useDispatch } from 'react-redux'
import ModalBoxDeposit from '../../UI/ModalBox/ModalBoxDeposit'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  return (
    <div className="login">

  <ModalBoxDeposit  visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
  <div className="deposit_pop_up">
    <div>Вход не выполнен. Проверьте правильность заполнения полей</div>
  </div>
  </ModalBoxDeposit>

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
          if (localStorage.getItem("stonksToken"))
          {
            props.sVisible(false)
          }
          else
          setmodalBoxDeposit(true)
        }}
      >
        Войти
      </button>
    </div>
  )
}




export default Login
