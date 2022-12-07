import axios from 'axios'
import { setAlertMessage, setAlertStatus, setSelectedCurrency, setUserBalance } from '../redux/slice'
const serverAddress = 'https://stonksexchange-kaivr.amvera.io'
// const serverAddress = 'http://localhost:5000'

export const changeBalance = (value) => {
  return async (dispatch) => {
    value = Number(value)
    Number(value)
    await axios
      .put(
        `${serverAddress}/api/auth/balance`,
        {
          value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      .then((response) => {
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
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}
