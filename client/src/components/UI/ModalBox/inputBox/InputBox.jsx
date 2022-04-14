import React from 'react'
import cl from './InputBox.module.css'

const InputBox = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.inputBox ]
  if (visible) {
    rootClasses.push(cl.active)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.inputBoxContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default InputBox
