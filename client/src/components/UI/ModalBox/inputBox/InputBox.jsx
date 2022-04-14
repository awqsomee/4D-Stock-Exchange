import React, { useEffect } from 'react'
import cl from './InputBox.module.css'
import '../../../UI/buttons/buttons.css'
import { useState } from 'react'
import Input from '../../../UI/input/Input'
import ButtonSwith from "../../../UI/buttons/ButtonSwitch"
import "../../../../components/balance/balance.css"
import { deposit } from '../../../../actions/user'

const InputBox = ({ setVisible, ...props}) => {
//   let rootClasses = [cl.inputBox ]
//   const [visible, setVisible ] = useState(false)
  const currency = "$"
  const [butt, setButt] = useState("button balance__button button__normal")
  const [inputText, setInputText] = useState("Пополнить")
  const [buttonText, setButtonText] = useState(inputText)
  const [rootClasses, setRootClasses] = useState(cl.inputBox)

//   if (visible) {
//     rootClasses.push(cl.inputBoxText)
//   }

  useEffect(( ) => {
    if (inputText==="" || inputText==="Пополнить" ) 
      setButtonText("Пополнить")
    else
      setButtonText(`${inputText}${currency}`)
  }, [inputText])

  return (
    <div className={rootClasses} onClick={() => setVisible(false)}>
        
      <Input value={inputText} setValue={setInputText} placeholder="Пополнить" className={cl.inputBoxText}
      onClick={(e) => e.stopPropagation()}>  
      </Input>
      
      <ButtonSwith className={butt} onClick={() => {
          if (butt==="button balance__button button__normal")
          setButt("button  button__push balance__button ")
          else
          deposit(Number(buttonText), props.currency)
            setRootClasses (cl.inputBoxFull)
            setButt("button balance__button button__normal")
      
      setInputText("")}
    //     if (password === repeatPassword) {
    //       registration(name, surname, email, password)
    //       props.sVisible(false)
    //     }
    }> {buttonText}
      </ButtonSwith>
    </div>
  )
}

export default InputBox
