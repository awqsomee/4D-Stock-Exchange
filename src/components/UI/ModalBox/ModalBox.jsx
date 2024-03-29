import React from 'react'
import cl from './ModalBox.module.css'

const ModalBox = ({ children, visible, setVisible, avatar, setAvatar }) => {
  const rootClasses = [cl.modalBox]
  if (visible) {
    rootClasses.push(cl.active)
  }

  return (
    <div
      className={rootClasses.join(' ')}
      onMouseDown={() => {
        setVisible(false)
        setAvatar(avatar)
      }}
    >
      <div className={cl.modalBoxContent} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalBox
