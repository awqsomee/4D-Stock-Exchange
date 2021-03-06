import axios from 'axios'
import { setUser } from '../redux/slice'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
// const serverAddress = 'http://localhost:5000'

export const registration = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${serverAddress}/api/auth/registration`, {
      email,
      password,
      name,
      surname,
    })
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
      console.log(e)
    }
  }
}

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('stonksToken', response.data.token)
    } catch (e) {
      localStorage.removeItem('stonksToken')
    }
  }
}

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
