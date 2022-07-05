import React, { useEffect } from 'react'
import cl from './InputBox.module.css'
import '../../../UI/buttons/buttons.css'
import { useState } from 'react'
import Input from '../../../UI/input/Input'
import ButtonSwith from '../../../UI/buttons/ButtonSwitch'
import '../../../../components/balance/balance.css'
import axios from 'axios'
import ModalBoxDeposit from '../ModalBoxDeposit'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

const InputBox = ({ setVisible, ...props }) => {
  const currency = '$'
  const [butt, setButt] = useState('button button__normal balance__button')
  const [inputText, setInputText] = useState('Пополнить')
  const [buttonText, setButtonText] = useState(inputText)
  const [rootClasses, setRootClasses] = useState(cl.inputBox)
  const [modalBoxDepositTrue, setmodalBoxDepositTrue] = useState(false)
  const [modalBoxDepositFalse, setmodalBoxDepositFalse] = useState(false)

  useEffect(() => {
    if (inputText === '' || inputText === 'Пополнить') setButtonText('Пополнить')
    else setButtonText(`${inputText}${currency}`)
  }, [inputText])

  const deposit = async (replenish, currency) => {
    try {
      const response = await axios.post(
        `${serverAddress}/api/auth/balance`,
        {
          replenish,
          currency,
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

  const withdraw = async (withdraw, currency) => {
    try {
      const response = await axios.delete(`${serverAddress}/api/auth/balance?withdraw=${withdraw}&currency=RUB`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      setmodalBoxDepositTrue(true)
      return response.data
    } catch (e) {
      setmodalBoxDepositFalse(true)
    }
  }

  const convert = async (fromCurrency, toCurrency, quantity) => {
    try {
      const response = await axios.delete(
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

  return (
    <div className={rootClasses} onClick={() => setVisible(false)}>
      <ModalBoxDeposit visible={modalBoxDepositTrue} setVisible={setmodalBoxDepositTrue}>
        <div className="deposit_true">
          {props.type === 'Deposit' && <div>Баланс успешно пополнен</div>}
          {props.type === 'Withdraw' && <div>Баланс успешно выведен</div>}
        </div>
      </ModalBoxDeposit>

      <ModalBoxDeposit visible={modalBoxDepositFalse} setVisible={setmodalBoxDepositFalse}>
        <div className="deposit_false">
          <div>Не вышло пополнить баланс. Проверьте корректность данных</div>
        </div>
      </ModalBoxDeposit>

      <Input
        value={inputText}
        setValue={setInputText}
        placeholder={props.btnText}
        className={cl.inputBoxText}
        type="number"
        onClick={(e) => e.stopPropagation()}
      ></Input>

      <ButtonSwith
        className={butt}
        onClick={
          () => {
            if (butt === 'button button__normal balance__button ') setButt('button  button__push balance__button ')
            setRootClasses(cl.inputBoxFull)
            setButt('button button__normal balance__button')

            setInputText('')
            if (inputText && inputText !== 'Пополнить')
              switch (props.type) {
                case 'Deposit':
                  deposit(Number(inputText), 'RUB')
                  break
                case 'Withdraw':
                  withdraw(Number(inputText), 'RUB')
                  break
                case 'Convert':
                  convert(Number(inputText), 'RUB')
                  break
              }
          }

          //     if (password === repeatPassword) {
          //       registration(name, surname, email, password)
          //       props.sVisible(false)
          //     }
        }
      >
        {props.btnText}
      </ButtonSwith>
    </div>
  )
}

export default InputBox
