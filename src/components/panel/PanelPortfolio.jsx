import React from 'react'
import './panel.css'

const PanelPortfolio = () => {
  return (
    <div className="container-panel">
      <div className="ticker">Тикер</div>
      <div className="name_portfolio">Наименование</div>
      <div className="amount">Кол-во</div>
      <div className="cost">Цена</div>
      <div className="change">Изменение</div>
    </div>
  )
}

export default PanelPortfolio
