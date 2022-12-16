import React from 'react'
import './statisticCard.css'

const StatisticCard = (props) => {
  return (
    <div className="statisticCard">
      <div className="statisticCard__info">
        <div className="statisticCard__name">{props.title1}</div>
        <div className="statisticCard__data">--</div>
      </div>
      <div className="statisticCard__info">
        <div className="statisticCard__name">{props.title2}</div>
        <div className="statisticCard__data">--</div>
      </div>
      {props.children}
    </div>
  )
}

export default StatisticCard
