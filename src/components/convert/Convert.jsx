import '../UI/buttons/buttons.css'
import './convert.css'
import '../UI/input/input.css'
// import cl from '../UI/input/'
import InputBox from '../UI/ModalBox/inputBox/InputBox'
import { useState } from 'react'
import { store } from '../../reducers'
import { setUser } from '../../reducers/userReducer'
import Input from '../UI/input/Input'
import axios from 'axios'
import ButtonSwith from '../UI/buttons/ButtonSwitch'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
// const serverAddress = 'http://localhost:5000'

const Balance = (props) => {
  const [modalBoxDepositTrue, setmodalBoxDepositTrue] = useState(false)
  const [modalBoxDepositFalse, setmodalBoxDepositFalse] = useState(false)

  // useEffect(() => {
  //   if (fromInputText === '' || fromInputText === 'Пополнить') setButtonText('Пополнить')
  //   else setButtonText(`${inputText}${currency}`)
  // }, [inputText])

  const convert = async (fromCurrency, toCurrency, quantity) => {
    try {
      const response = await axios.post(
        `${serverAddress}/api/auth/balance/convert`,
        {
          fromCurrency,
          toCurrency,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      setmodalBoxDepositTrue(true)
      return response.data
    } catch (e) {
      setmodalBoxDepositFalse(true)
    }
  }

  const [fromInputText, setFromInputText] = useState('')
  const [toInputText, setToInputText] = useState('')
  return (
    <div className="balance">
      <ModalBoxDeposit visible={modalBoxDepositTrue} setVisible={setmodalBoxDepositTrue}>
        <div className="deposit_true">
          <div>Конвертация прошла успешно</div>
        </div>
      </ModalBoxDeposit>

      <ModalBoxDeposit visible={modalBoxDepositFalse} setVisible={setmodalBoxDepositFalse}>
        <div className="deposit_false">
          <div>Не вышло пополнить баланс. Проверьте корректность данных</div>
        </div>
      </ModalBoxDeposit>
      <div className="balance__summ">{`${new Intl.NumberFormat('ru-RU').format(
        store.getState(setUser).user.currentUser.balanceRUB
      )} ₽`}</div>
      <Input className="inputBox" value={fromInputText} setValue={setFromInputText} placeholder="100 RUB" />
      <p>В</p>
      <Input className="inputBox" value={toInputText} setValue={setToInputText} placeholder="USD" />
      <ButtonSwith
        className="button button__normal button_convert"
        onClick={() => {
          if (fromInputText && toInputText) {
            const input = fromInputText.split(' ')
            convert(input[1], toInputText, Number(input[0]))
          }
        }}
      >
        Перевести
      </ButtonSwith>
    </div>
  )
}

export default Balance
