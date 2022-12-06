import React from 'react'
import './statisticCard.css'

const StatisticCard = (props, children) => {
  return (
    <div className="statisticCard">
      <div className="statisticCard__info">
        <div className="statisticCard__name">{props.title1}</div>
        <div className="statisticCard__data">{props.data1}</div>
      </div>
      <div className="statisticCard__info">
        <div className="statisticCard__name">{props.title2}</div>
        <div className="statisticCard__data">{props.data2}</div>
      </div>
      {/* {children} */}
    </div>
  )
}

export default StatisticCard
