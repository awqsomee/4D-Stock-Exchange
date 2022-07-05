import React from 'react'
import { useState } from 'react'
import './login.css'
import Input from '../../UI/input/Input'
import { login } from '../../../actions/user'
import { store } from '../../../redux'
import ModalBoxDeposit from '../../UI/ModalBox/ModalBoxDeposit'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slice'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  return (
    <div className="login">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
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
        onClick={async () => {
          await dispatch(login(email, password))
          console.log(store.getState(setUser).toolkit.isAuth)
          if (store.getState(setUser).toolkit.isAuth) {
            props.sVisible(false)
          } else setmodalBoxDeposit(true)
        }}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
