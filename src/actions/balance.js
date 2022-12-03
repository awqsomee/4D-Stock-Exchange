import axios from 'axios'
import { setSelectedCurrency, setUserBalance } from '../redux/slice'
// const serverAddress = 'https://stonksexchange.kaivr.amvera.io'
const serverAddress = 'http://localhost:5000'

export const changeBalance = (value) => {
  return async (dispatch) => {
    try {
      value = Number(value)
      const response = await axios.put(
        `${serverAddress}/api/auth/balance`,
        {
          value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      dispatch(setUserBalance(response.data.user.balance))

      // One LEG!!!
      dispatch(
        setSelectedCurrency({
          _id: response.data.user.id,
          symbol: 'RUB',
          name: 'Рубль',
          user: response.data.user.id,
          amount: response.data.user.balance,
          __v: 0,
        })
      )
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}
