import React from 'react'

const ButtonSwith = ({children,...props}) => {
  return (
    <button className={props.className} onClick={props.onClick}>{children}</button>
  )
}

export default ButtonSwith
