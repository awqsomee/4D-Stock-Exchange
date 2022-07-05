import '../UI/buttons/buttons.css'
import './balance.css'
import '../UI/input/input.css'
import InputBox from '../UI/ModalBox/inputBox/InputBox'
import { useState } from 'react'
import { store } from '../../redux'
import { setUser } from '../../redux/slice'

const Balance = (props) => {
  const [modalBox, setModalBox] = useState(false)

  const currency = 'USD'
  return (
    <div className="balance">
      <div className="balance__summ">{`${new Intl.NumberFormat('ru-RU').format(
        store.getState(setUser).toolkit.currentUser.balanceUSD
      )} $`}</div>
      <InputBox
        visible={modalBox}
        setVisible={setModalBox}
        currency={currency}
        type={props.type}
        btnText={props.btnText}
      ></InputBox>
    </div>
  )
}

export default Balance
