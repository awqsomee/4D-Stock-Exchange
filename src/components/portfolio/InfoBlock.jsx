import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import { store } from '../../redux'

const InfoBlock = ({ stocks, income, setIncome }) => {
  const userCurrencies = useSelector((state) => state.toolkit.userCurrencies)
  const [difference, setDifference] = useState(-1000)
  const [differenceInPersentage, setdifferenceInPersentage] = useState(-1000)
  useEffect(() => {
    countChanges()
    countDifference()
    countDifferenceInPersentage()
  }, [stocks])

  const countChanges = () => {
    let summ = 0
    let balance = store.getState().toolkit.currentUser.balance
    userCurrencies.map((currency) => {
      summ = summ + currency.amount * currency.price
    })
    stocks.map((stock) => {
      if (stock.prices[0].close != null) {
        summ = summ + stock.amount * stock.prices[0].close
      }
    })
    summ = (summ + balance).toFixed(2)
    setIncome(summ)
  }

  const countDifference = () => {
    let summ = 0
    let balance = store.getState().toolkit.currentUser.balance
    userCurrencies.map((currency) => {
      summ = summ + (currency.amount * currency.price - currency.amount * currency.latestPrice)
    })
    stocks.map((stock) => {
      if (stock.prices[0].close != null) {
        summ = summ + stock.amount * stock.prices[0].close * ((stock?.prices[0].close - stock?.latestPrice) / 100)
      }
    })
    summ = (summ + balance).toFixed(2)
    setDifference(summ)
  }
  const countDifferenceInPersentage = () => {
    let summ = ((difference * 100) / income).toFixed(2)
    setdifferenceInPersentage(summ)
  }

  return (
    <div className="stockList__info">
      <InfoCard title={'Активы'} info={new Intl.NumberFormat('ru-RU').format(income) + ' руб'}></InfoCard>
      <InfoCard
        style={difference >= 0 ? { color: '#bbffa7' } : { color: '#fd2929' }}
        title={difference >= 0 ? 'Прибыль' : 'Убытки'}
        info={new Intl.NumberFormat('ru-RU').format(difference) + ' руб'}
      ></InfoCard>
      <InfoCard
        style={differenceInPersentage >= 0 ? { color: '#bbffa7' } : { color: '#fd2929' }}
        title={differenceInPersentage >= 0 ? 'Прибыль, %' : 'Убытки, %'}
        info={new Intl.NumberFormat('ru-RU').format(differenceInPersentage) + '%'}
      ></InfoCard>
    </div>
  )
}

export default InfoBlock
