import React, { useEffect } from 'react'
import '../UI/buttons/buttons.css'
import "./balance.css"
import "../UI/input/input.css"
import InputBox from '../UI/ModalBox/inputBox/InputBox'
import { useState } from 'react'
import Input from '../UI/input/Input'
import ButtonSwith from "../UI/buttons/ButtonSwitch"

const Balance = (props) => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]
  // const currency = "$"
  const [modalBox, setModalBox] = useState(false)
  // const [butt, setButt] = useState(" button button__normal balance__button")
  // const [inputText, setInputText] = useState("Пополнить")
  // const [buttonText, setButtonText] = useState(inputText)

  // useEffect(( ) => {
  //   if (inputText==="" || inputText==="Пополнить" ) 
  //     setButtonText("Пополнить")
  //   else
  //     setButtonText(`${inputText}  ${currency}`)
  // }, [inputText])
  // const [modalBoxInput, setModalBoxReg] = useState(false)

  return (
      <div className="balance">
        <div className="balance__summ" >{props.balance}</div>
       
        <InputBox visible={modalBox} setVisible={setModalBox}>
            
        </InputBox>
         
        
      </div>
  )
}

export default Balance
