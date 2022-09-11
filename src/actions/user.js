import axios from 'axios'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
// const serverAddress = 'http://localhost:5000'

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
