import axios from 'axios'
import { setUserBalance } from '../redux/slice'
// const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
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
    } catch (e) {
      console.log(e)
    }
  }
}
