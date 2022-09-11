import React from 'react'
import cl from './ModalBox.module.css'

const ModalBoxAcc = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.modalBox]
  if (visible) {
    rootClasses.push(cl.active)
  }

  return (
    <div className={rootClasses.join(' ')} onMouseDown={() => setVisible(false)}>
      <div className={cl.modalBoxContentAcc} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalBoxAcc
