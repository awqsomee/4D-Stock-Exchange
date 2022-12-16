import axios from 'axios'
import { store } from '../redux'
import { logout, setAccountUser, setAlertMessage, setAlertStatus, setUser } from '../redux/slice'
const serverAddress = 'https://stonksexchange-kaivr.amvera.io'
// const serverAddress = 'http://localhost:5000'

export const buyStock = (symbol, quantity) => {
  return async (dispatch) => {
    await axios
      .post(
        `${serverAddress}/api/auth/stock`,
        { symbol, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      .then((response) => {
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const sellStock = (symbol, quantity) => {
  return async (dispatch) => {
    await axios
      .delete(
        `${serverAddress}/api/auth/stock/`,
        { symbol, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      .then((response) => {
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
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

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    await axios
      .post(`${serverAddress}/api/auth/user/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      .then((response) => {
        dispatch(setUser({ ...store.getState().toolkit.currentUser, ...response.data.user }))
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const deleteAccount = () => {
  return async (dispatch) => {
    console.log(localStorage.getItem('stonksToken'))
    const response = await axios
      .delete(`${serverAddress}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      .then((response) => {
        // dispatch(logout())
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}
