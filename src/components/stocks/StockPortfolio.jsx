import React, { useEffect, useState } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import ArrowDown from '../../assets/Icons/angle_down.svg'
import ArrowUp from '../../assets/Icons/angle_up.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import Graph_panel from '../grahp-panel/Graph_panel'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/slice'
import { exchangeStocks } from '../../actions/stocks'
// const serverAddress = 'https://stonksexchange.kaivr.amvera.io'
const serverAddress = 'http://localhost:5000'

const StockPortfolio = (props) => {
  const isAuth = useSelector((state) => state.toolkit.isAuth)
  const dispatch = useDispatch()
  const [changes, setChanges] = useState()
  const [counter, setCounter] = useState(0)
  const [slashString, setslashString] = useState('')
  const [GP, setGP] = useState(false)
  const [mouse, setMouse] = useState(false)
  const [buttBuy, setButtBuy] = useState('button stock__button button__normal')

  useEffect(() => {
    if (!props.stock.amount) setslashString('')
    else setslashString(`/${props.stock.amount}`)
    countChange()
  }, [])

  function less() {
    if (counter > 0) setCounter(counter - 1)
    if (counter == 1) setButtBuy('button stock__button button__normal')
  }

  function more() {
    if (counter < props.stock.amount || !props.stock.amount) setCounter(counter + 1)
  }

  const countChange = () => {
    if (props.stock?.prices.length > 0 && props.stock?.prices[0].high != null) {
      let count = (props.stock?.prices[0].high - props.stock?.prices[1].high) / 100
      setChanges(count.toFixed(2))
    }
  }
  return (
    <div>
      <div className="stock">
        <div className="stock__index">{props.stock.symbol}</div>
        <div className="stock__name_portfolio">{props.stock.name}</div>
        <div className="stock__amount">{props.stock.amount}</div>

        <div className="stock__cost">
          {props.stock?.prices.length > 0 && props.stock.prices[0].close != null ? (
            <div>{props.stock?.prices[0].close.toFixed(2) + ' ' + props.stock?.currency}</div>
          ) : (
            <div>-</div>
          )}
        </div>

        {changes < 0 ? <div className="stock__change stock__change__red">{changes}%</div> : <></>}
        {changes == 0 ? <div className="stock__change">{changes}%</div> : <></>}
        {changes > 0 ? <div className="stock__change stock__change__green">{changes}%</div> : <></>}

        {buttBuy === 'button stock__button button__process' ? (
          <div className="stock__counter">
            <button className="button__none stock__counter__less" onClick={less}>
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.75 11.5C5.75 11.3094 5.82573 11.1266 5.96052 10.9918C6.09531 10.857 6.27813 10.7812 6.46875 10.7812H16.5312C16.7219 10.7812 16.9047 10.857 17.0395 10.9918C17.1743 11.1266 17.25 11.3094 17.25 11.5C17.25 11.6906 17.1743 11.8734 17.0395 12.0082C16.9047 12.143 16.7219 12.2188 16.5312 12.2188H6.46875C6.27813 12.2188 6.09531 12.143 5.96052 12.0082C5.82573 11.8734 5.75 11.6906 5.75 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="count">
              {counter}
              {slashString}
            </div>
            <button onClick={more} className="button__none">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stock__counter__more"
              >
                <path
                  d="M11.5 5.75C11.6906 5.75 11.8734 5.82573 12.0082 5.96052C12.143 6.09531 12.2188 6.27813 12.2188 6.46875V10.7812H16.5312C16.7219 10.7812 16.9047 10.857 17.0395 10.9918C17.1743 11.1266 17.25 11.3094 17.25 11.5C17.25 11.6906 17.1743 11.8734 17.0395 12.0082C16.9047 12.143 16.7219 12.2188 16.5312 12.2188H12.2188V16.5312C12.2188 16.7219 12.143 16.9047 12.0082 17.0395C11.8734 17.1743 11.6906 17.25 11.5 17.25C11.3094 17.25 11.1266 17.1743 10.9918 17.0395C10.857 16.9047 10.7812 16.7219 10.7812 16.5312V12.2188H6.46875C6.27813 12.2188 6.09531 12.143 5.96052 12.0082C5.82573 11.8734 5.75 11.6906 5.75 11.5C5.75 11.3094 5.82573 11.1266 5.96052 10.9918C6.09531 10.857 6.27813 10.7812 6.46875 10.7812H10.7812V6.46875C10.7812 6.27813 10.857 6.09531 10.9918 5.96052C11.1266 5.82573 11.3094 5.75 11.5 5.75Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        ) : null}
        <button
          className={buttBuy}
          onClick={() => {
            if (buttBuy === 'button stock__button button__normal') setCounter(1)
            setButtBuy('button stock__button button__process')
            if (isAuth && counter > 0) {
              if (props.buttonText == 'Купить') dispatch(exchangeStocks(props.stock.symbol, counter))
              if (props.buttonText == 'Продать') dispatch(exchangeStocks(props.stock.symbol, -counter))
              setCounter(0)
              setButtBuy('button stock__button button__normal')
            }
          }}
        >
          {counter == 0
            ? props.buttonText
            : `${(props.stock?.prices[0].close * counter).toFixed(2)} ${props.stock.currency}`}
        </button>
        <button
          onClick={() => {
            if (GP) setGP(false)
            else setGP(true)
          }}
          className="stock__arrow"
        >
          {GP && (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrowDown_img"
            >
              <path
                d="M1.46077 5.85643C1.93597 5.38563 2.70157 5.38123 3.18117 5.84323L3.19437 5.85643L11 13.574L18.8056 5.85643C19.2808 5.38563 20.0464 5.38123 20.526 5.84323L20.5392 5.85643C21.0144 6.32723 21.0188 7.08403 20.5524 7.55923L20.5392 7.57243L11.8668 16.1436C11.3916 16.6144 10.626 16.6188 10.1464 16.1568L10.1332 16.1436L1.46077 7.56803C0.981174 7.09723 0.981174 6.32723 1.46077 5.85643Z"
                fill="white"
              />
            </svg>
          )}
          {!GP && (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg "
              className="arrowUp_img"
            >
              <path
                d="M20.5392 16.1436C20.064 16.6144 19.2984 16.6188 18.8188 16.1568L18.8056 16.1436L11 8.42596L3.19442 16.1436C2.71922 16.6144 1.95362 16.6188 1.47402 16.1568L1.46082 16.1436C0.985622 15.6728 0.981222 14.916 1.44762 14.4408L1.46082 14.4276L10.1332 5.85636C10.6084 5.38556 11.374 5.38116 11.8536 5.84316L11.8668 5.85636L20.5392 14.432C21.0188 14.9028 21.0188 15.6728 20.5392 16.1436Z"
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
      {GP && <Graph_panel stock={props.stock} />}
    </div>
  )
}

export default StockPortfolio
