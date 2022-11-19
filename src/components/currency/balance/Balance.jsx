import { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../../UI/buttons/buttons.css'
import './balance.css'
import { store } from '../../../redux'
import { setUser } from '../../../redux/slice'
import { changeBalance } from '../../../actions/balance'
import InputNumber from '../../UI/input/InputNumber'

const replenishHandler = async (dispatch, value, setValue) => {
  await dispatch(changeBalance(value))
  setValue(0)
}

const withdrawHandler = async (dispatch, value, setValue) => {
  await dispatch(changeBalance(-value))
  setValue(0)
}

const changeHandler = (value, setValue) => {
  setValue(value.replaceAll(/\D/g, ''))
}

const Balance = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const currencyName = 'Рубль'
  return (
    <div className="balance">
      <div className="balance__currency">{currencyName}</div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="balance__sum">
          {`${new Intl.NumberFormat('ru-RU').format(store.getState(setUser).toolkit.currentUser.balance)} ₽`}
        </div>
        <button className="button balance__button" onClick={() => replenishHandler(dispatch, value, setValue)}>
          Пополнить
        </button>
        <button className="button balance__button" onClick={() => withdrawHandler(dispatch, value, setValue)}>
          Вывести
        </button>
        <form onSubmit={() => replenishHandler(dispatch, value, setValue)}>
          <InputNumber
            onChange={(event) => changeHandler(event.target.value, setValue)}
            value={value}
            placeholder={'Сумма'}
          ></InputNumber>
        </form>
      </div>
    </div>
  )
}

export default Balance
