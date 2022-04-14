import React from 'react'
import '../UI/buttons/buttons.css'
import './balance.css'
import '../UI/input/input.css'
import ModalBox from '../UI/ModalBox/ModalBox'
import { useState } from 'react'
import Input from '../UI/input/Input'

const Balance = (props) => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]
  const [modalBox, setModalBox] = useState(false)

  // const [modalBoxInput, setModalBoxReg] = useState(false)

  return (
    <div className="balance">
      <ModalBox visible={modalBox} setVisible={setModalBox}>
        <Input className="search balance__input"> </Input>
      </ModalBox>
      <div className="balance__summ">{props.balance}</div>
      <input className="search balance__input"></input>

      <button className="balance__button button button__normal" onClick={() => setModalBox(true)}>
        Пополнить
      </button>
    </div>
  )
}

export default Balance
