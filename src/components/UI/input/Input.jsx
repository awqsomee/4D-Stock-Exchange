import React from 'react'
import './input.css'
// import classes from "./input.module.less";

const Input = (props) => {
  // const [value, setValue] = useState('')

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

export default Input
