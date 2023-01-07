import axios from 'axios'
import {
    setAlertMessage,
    setAlertStatus,
    setSelectedCurrency,
    setTransactions,
    setUserBalance,
} from '../redux/slice'
import serverAddress from '../utils/serverAddress'

export const changeBalance = (transactions, value) => {
    return async (dispatch) => {
        value = Number(value)
        Number(value)
        await axios
            .put(
                `${serverAddress}/api/auth/balance`,
                {
                    value,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
                }
            )
            .then((response) => {
                dispatch(setUserBalance(response.data.user.balance))
                // One LEG!!!
                dispatch(
                    setSelectedCurrency({
                        _id: response.data.user.id,
                        symbol: 'RUB',
                        name: 'Рубль',
                        user: response.data.user.id,
                        amount: response.data.user.balance,
                        __v: 0,
                    })
                )
                dispatch(setTransactions([response.data.transaction, ...transactions]))
                dispatch(setAlertMessage(response.data.message))
                dispatch(setAlertStatus(response.status))
            })
            .catch((error) => {
                dispatch(setAlertMessage(error.response.data.message))
                dispatch(setAlertStatus(error.response.status))
            })
    }
}
