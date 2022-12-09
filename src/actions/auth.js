import axios from 'axios'
import { setAlertMessage, setAlertStatus, setAvatar, setUser } from '../redux/slice'
const serverAddress = 'https://stonksexchange-kaivr.amvera.io'
// const serverAddress = 'http://localhost:5000'

export const registration = (name, email, password) => {
  return async (dispatch) => {
    await axios
      .post(`${serverAddress}/api/auth/registration`, {
        email,
        password,
        name,
      })
      .then((response) => {
        dispatch(setUser(response.data.user))
        localStorage.setItem('stonksToken', response.data.token)
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    await axios
      .post(`${serverAddress}/api/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        dispatch(setUser(response.data.user))
        dispatch(setAvatar(response.data.user.avatar))
        localStorage.setItem('stonksToken', response.data.token)
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      dispatch(setUser(response.data.user))
      dispatch(setAvatar(response.data.user.avatar))
      localStorage.setItem('stonksToken', response.data.token)
    } catch (e) {
      localStorage.removeItem('stonksToken')
      console.log(e)
    }
  }
}
