import axios from 'axios'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

export const getTransactions = async () => {
  try {
    const responce = await axios.get(`${serverAddress}/api/auth/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
    })
    responce.data.transactions.reverse()
    return responce.data.transactions
  } catch (e) {
    console.log(e)
  }
}
