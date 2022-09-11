import React from 'react'
import './panel.css'

const Panel = () => {
  return (
    <div className="container-panel">
      <div className="name">Наименование</div>
      <div className="cost">Цена акции</div>
      <div className="change">Изменение</div>
      <div className="rest"></div>
    </div>
  )
}

export default Panel
