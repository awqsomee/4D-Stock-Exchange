import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import { store } from '../../redux'
import Loader from '../UI/loader/Loader'
import ButtonLoader from '../UI/loader/ButtonLoader'

const InfoBlock = ({ stocks, isLoading }) => {
  const userCurrencies = useSelector((state) => state.toolkit.userCurrencies)
  const [difference, setDifference] = useState(-1000)
  const [differenceInPersentage, setdifferenceInPersentage] = useState(-1000)
  const [income, setIncome] = useState(0)

  useEffect(() => {
    countChanges()
  }, [stocks])

  const countChanges = () => {
    let summ = 0
    let balance = store.getState().toolkit.currentUser.balance
    userCurrencies.map((currency) => {
      console.log(currency)
      summ = summ + currency.amount * currency.price
    })
    stocks.map((stock) => {
      console.log(stock)
      if (stock.prices[0].close != null) {
        summ = summ + stock.amount * stock.prices[0].close
      }
    })
    summ = summ + balance
    setIncome(summ)

    let dif = 0
    userCurrencies.map((currency) => {
      dif = dif + currency.difference
    })
    stocks.map((stock) => {
      if (stock.prices[0].close != null) {
        dif = dif + stock.amount * (stock?.prices[0].close - stock?.latestPrice)
      }
    })
    dif = dif
    setDifference(dif)
    setdifferenceInPersentage((dif / summ) * 100)
  }

  return (
    <div className="stockList__info">
      <InfoCard title={'Активы'}>
        {isLoading ? <ButtonLoader /> : <div className="infoCard__info">{income.toFixed(2) + ' руб'}</div>}
      </InfoCard>
      <InfoCard
        style={difference >= 0 ? { color: '#bbffa7' } : { color: '#fd2929' }}
        title={difference >= 0 ? 'Прибыль' : 'Убытки'}
      >
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <div className="infoCard__info" style={difference >= 0 ? { color: '#bbffa7' } : { color: '#fd2929' }}>
            {difference.toFixed(2) + ' руб'}
          </div>
        )}
      </InfoCard>
      <InfoCard title={differenceInPersentage >= 0 ? 'Прибыль, %' : 'Убытки, %'}>
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <div className="infoCard__info" style={difference >= 0 ? { color: '#bbffa7' } : { color: '#fd2929' }}>
            {differenceInPersentage.toFixed(2) + '%'}
          </div>
        )}
      </InfoCard>
    </div>
  )
}

export default InfoBlock
