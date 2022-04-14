import React from 'react'
import '../UI/buttons/buttons.css'
import "./balance.css"
import "../UI/input/input.css"
import InputBox from '../UI/ModalBox/inputBox/InputBox'
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
        <div className="balance__summ" ></div>
       
        <InputBox visible={modalBox} setVisible={setModalBox}>
            <Input className="search balance__input">  </Input>
        </InputBox>
        <button className="balance__button button button__normal" onClick={() => setModalBox(true)}>Пополнить</button>
      </div>
  )
}

export default Balance
