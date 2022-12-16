import React from 'react'
import cl from '../../UI/ModalBox/ModalBox.module.css'

const ModalBoxDeposit = ({ children, visible, setVisible, alertStatus }) => {
  const rootClasses = [cl.modalBox]
  if (visible) {
    rootClasses.push(cl.active)
  }

  const StyledChildren = () => {
    if (alertStatus != 200) return React.cloneElement(children, { className: `${children.props.className} err` })
    else return React.cloneElement(children, { className: `${children.props.className} ok` })
  }

  return (
    <div
      className={rootClasses.join(' ')}
      onClick={() => {
        setVisible(false)
      }}
    >
      <div className={cl.setmodalBoxDeposit} onClick={(e) => e.stopPropagation()}>
        <StyledChildren />
      </div>
    </div>
  )
}
export default ModalBoxDeposit
