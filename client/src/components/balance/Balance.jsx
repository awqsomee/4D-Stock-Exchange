import React, { useEffect } from 'react'
import '../UI/buttons/buttons.css'
import './balance.css'
import '../UI/input/input.css'
import InputBox from '../UI/ModalBox/inputBox/InputBox'
import { useState } from 'react'
import axios from 'axios'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

const Balance = (props) => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]
  // const currency = "$"
  const [modalBox, setModalBox] = useState(false)
  // const [balance, setBalance] = useState()
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

  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance()
  }, [])

  const getBalance = async () => {
    try {
      const responce = await axios.get(`${serverAddress}/api/auth/balance`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      setBalance(responce.data['balanceUSD'])
    } catch (e) {
      console.log(e)
    }
  }

  const currency = 'USD'
  return (
    <div className="balance">
      <div className="balance__summ">{`${balance} $`}</div>
      <InputBox visible={modalBox} setVisible={setModalBox} currency={currency}></InputBox>
    </div>
  )
}

export default Balance
