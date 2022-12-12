import React from 'react'
import './infoCard.css'

const InfoCard = (props) => {
  return (
    <div className="infoCard">
      <div className="infoCard__title">{props.title}</div>
      <div className="infoCard__info">{props.info}</div>
    </div>
  )
}

export default InfoCard
