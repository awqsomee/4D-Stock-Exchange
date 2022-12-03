import axios from 'axios'
import { setAccountUser, setAlertMessage, setAlertStatus } from '../redux/slice'
// const serverAddress = 'https://stonksexchange.kaivr.amvera.io'
const serverAddress = 'http://localhost:5000'

export const buyStock = (symbol, quantity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${serverAddress}/api/auth/stock`,
        { symbol, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      alert(response.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const sellStock = (symbol, quantity) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${serverAddress}/api/auth/stock/`,
        { symbol, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      alert(response.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const getAccount = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      dispatch(setAccountUser(response.data.user))
      return response.data.user
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    const response = await axios
      .put(
        `${serverAddress}/api/auth/user`,
        {
          ...account,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
        }
      )
      .then((response) => {
        dispatch(setAccountUser(response.data.user))
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}
