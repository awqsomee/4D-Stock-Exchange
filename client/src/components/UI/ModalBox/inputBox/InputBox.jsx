import React, { useEffect } from 'react'
import cl from './InputBox.module.css'
import '../../../UI/buttons/buttons.css'
import { useState } from 'react'
import Input from '../../../UI/input/Input'
import ButtonSwith from '../../../UI/buttons/ButtonSwitch'
import '../../../../components/balance/balance.css'
import axios from 'axios'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

const InputBox = ({ setVisible }) => {
  //   let rootClasses = [cl.inputBox ]
  //   const [visible, setVisible ] = useState(false)
  const currency = '$'
  const [butt, setButt] = useState('button balance__button button__normal')
  const [inputText, setInputText] = useState('Пополнить')
  const [buttonText, setButtonText] = useState(inputText)
  const [rootClasses, setRootClasses] = useState(cl.inputBox)

  //   if (visible) {
  //     rootClasses.push(cl.inputBoxText)
  //   }

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
      return response.data
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className={rootClasses} onClick={() => setVisible(false)}>
      <Input
        value={inputText}
        setValue={setInputText}
        placeholder="Пополнить"
        className={cl.inputBoxText}
        type="number"
        onClick={(e) => e.stopPropagation()}
      ></Input>

      <ButtonSwith
        className={butt}
        onClick={
          () => {
            if (butt === 'button balance__button button__normal') setButt('button  button__push balance__button ')
            console.log(butt)
            setRootClasses(cl.inputBoxFull)
            setButt('button balance__button button__normal')

            setInputText('')
            if (inputText && inputText !== 'Пополнить') deposit(Number(inputText), 'USD')
          }
          //     if (password === repeatPassword) {
          //       registration(name, surname, email, password)
          //       props.sVisible(false)
          //     }
        }
      >
        {buttonText}
      </ButtonSwith>
    </div>
  )
}

export default InputBox
