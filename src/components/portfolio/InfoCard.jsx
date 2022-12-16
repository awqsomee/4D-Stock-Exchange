import React from 'react'
import './infoCard.css'

const InfoCard = (props) => {
  return (
    <div className="infoCard">
      <div className="infoCard__title">{props.title}</div>
      {props.children}
    </div>
  )
}

export default InfoCard
