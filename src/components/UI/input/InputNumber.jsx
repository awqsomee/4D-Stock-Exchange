import React from 'react'
import './input.css'

const InputNumber = (props) => {
  const changeHandler = (value, setValue) => {
    setValue(value.replaceAll(/\D/g, ''))
  }

  return (
    <input
      className={props.className}
      onChange={(event) => {
        event.stopPropagation()
        changeHandler(event.target.value, props.setValue)
      }}
      value={props.value}
      placeholder={'Сумма'}
    ></input>
  )
}

export default InputNumber
