import '../../UI/buttons/buttons.css'
import './balance.css'
import '../../UI/input/input.css'
import { store } from '../../../redux'
import { setUser } from '../../../redux/slice'

const Balance = () => {
  const currencyName = 'Рубль'
  return (
    <div className="balance">
      <div className="balance__currency">{currencyName}</div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="balance__sum">
          {`${new Intl.NumberFormat('ru-RU').format(store.getState(setUser).toolkit.currentUser.balanceRUB)} ₽`}
        </div>
        <button className="button balance__button">Пополнить</button>
        <button className="button balance__button">Вывести</button>
      </div>
    </div>
  )
}

export default Balance
