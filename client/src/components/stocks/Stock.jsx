import React, { useEffect } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import Arrow from '../../assets/Icons/angle_down.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import compareTime from '../../utils/compareTime'

const Stock = (props) => {
  const stock = {
    '1. symbol': 'IBM',
    '2. name': 'International Business Machines Corp',
    '3. type': 'Equity',
    '4. region': 'United States',
    '5. marketOpen': '09:30',
    '6. marketClose': '16:00',
    '7. timezone': 'UTC-04',
    '8. currency': 'USD',
    '9. matchScore': '1.0000',
    quantity: 15,
  }

  // const isOpen = compareTime(stock)

  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  const symbol = 'BA'
  const quantity = 10

  const buyStock = (symbol, quantity) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/auth/stock',
          { symbol, quantity },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
          }
        )
        console.log(response.data)
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  }

  return (
    <div>
      <div className="number">{props.stock.number}</div>
      <div className="stock">
        <div className="stock__index">{props.stock.symbol}</div>
        <div className="stock__name">{props.stock.name}</div>
        <div className="stock__cost">
          {props.stock.price} {props.stock.currency}
        </div>
        <div className="stock__change">+23%</div>
        <div className="stock__counter">
          <div className="stock__counter__less">
            <img src={Less} alt="less_img" className="less_img"></img>{' '}
          </div>
          <div className="count">1</div>
          <div className="stock__counter__more">
            <img src={More} alt="more_img" className="more_img"></img>{' '}
          </div>
        </div>
        <button
          className="button button__normal"
          onClick={() => {
            if (isAuth) dispatch(buyStock(symbol, quantity))
            // else setModalLog(true)
          }}
        >
          Купить
        </button>
        <div className="stock__arrow">
          <img src={Arrow} alt="arrow_img" className="arrow_img" />
        </div>
      </div>
    </div>
  )
}

export default Stock
