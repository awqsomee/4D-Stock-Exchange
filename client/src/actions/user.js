import axios from 'axios'
import { setUser } from '../reducers/userReducer'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

export const registration = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${serverAddress}/api/auth/registration`, {
      email,
      password,
      name,
      surname,
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${serverAddress}/api/auth/login`, {
        email,
        password,
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('stonksToken', response.data.token)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      console.log(localStorage.getItem('stonksToken'))
      dispatch(setUser(response.data.user))
      localStorage.setItem('stonksToken', response.data.token)
    } catch (e) {
      localStorage.removeItem('stonksToken')
    }
  }
}
