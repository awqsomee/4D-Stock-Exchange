import React from 'react'
import cl from '../../UI/ModalBox/ModalBox.module.css'

const ModalBoxDeposit = ({ children, visible, setVisible, alertStatus }) => {
  const rootClasses = [cl.modalBox]
  if (visible) {
    rootClasses.push(cl.active)
  }

  const StyledChildren = () => {
    React.Children.map((children, child) => {
      console.log('a', alertStatus)
      console.log(children, child)
      if (alertStatus != 200)
        return React.cloneElement(child.props.children, { className: `${child.props.className} err` })
      else return React.cloneElement(child, { className: `${child.props.className} ok` })
    })
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.setmodalBoxDeposit} onClick={(e) => e.stopPropagation()}>
        <StyledChildren />
      </div>
    </div>
  )
}
export default ModalBoxDeposit
