import React from 'react'
import './panel.css'

const Panel = () => {
  return (
    <div className="container-panel">
      <div className="ticker">Тикер</div>
      <div className="name">Наименование</div>
      <div className="cost">Цена</div>
      <div className="change">Изменение</div>
    </div>
  )
}

export default Panel
