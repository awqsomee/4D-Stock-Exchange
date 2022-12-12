import React, { useEffect } from 'react'
import { useState } from 'react'
import InfoCard from './InfoCard'

const InfoBlock = ({ stocks, income, setIncome }) => {
  const [difference, setDifference] = useState(-1000)
  const [differenceInPersentage, setdifferenceInPersentage] = useState(-1000)
  useEffect(() => {
    countChanges()
  }, [stocks])

  const countChanges = () => {
    let summ = 0
    stocks.map((stock) => {
      if (stock.prices[0].close != null) {
        summ = summ + stock.amount * stock.prices[0].close * ((stock?.prices[0].close - stock?.latestPrice) / 100)
      }
    })
    setIncome(summ)
  }

  return (
    <div className="stockList__info">
      {console.log(income)}
      <InfoCard title={'Активы'} info={income}></InfoCard>
      <InfoCard title={difference >= 0 ? 'Прибыль' : 'Убытки'} info={income}></InfoCard>
      <InfoCard title={differenceInPersentage >= 0 ? 'Прибыль, %' : 'Убытки, %'} info={income}></InfoCard>
    </div>
  )
}

export default InfoBlock
