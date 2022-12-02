import axios from 'axios'
const serverAddress = 'https://stonksexchange.kaivr.amvera.io'

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
