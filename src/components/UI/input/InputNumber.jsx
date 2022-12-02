import React from 'react'
import './input.css'

const InputNumber = React.forwardRef((props, ref) => {
  const changeHandler = (value, setValue) => {
    setValue(value.replaceAll(/\D/g, ''))
  }
  console.log(props.onBlur)

  return (
    <input
      className={props.className}
      onChange={(event) => {
        event.stopPropagation()
        changeHandler(event.target.value, props.setValue)
      }}
      value={props.value}
      placeholder={props.placeholder}
      onBlur={props.onBlur}
    ></input>
  )
})

export default InputNumber
