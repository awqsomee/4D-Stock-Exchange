import axios from 'axios'
import { setTransactions } from '../redux/slice'
import serverAddress from '../utils/serverAddress'

export const getTransactions = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${serverAddress}/api/auth/transactions`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
            })
            dispatch(setTransactions(response.data.transactions.reverse()))
        } catch (e) {
            console.log(e)
        }
    }
}
