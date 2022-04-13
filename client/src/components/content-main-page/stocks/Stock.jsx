import React from 'react'
import Less from '../../../assets/Icons/DashCircle.svg'
import More from '../../../assets/Icons/PlusCircle.svg'
import Arrow from '../../../assets/Icons/angle_down.svg'
import './stock.css'
import '../../../utils/buttons/buttons.css'

const Stock = () => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]

  return (
    <div className="stock">
      <div className="stock__index">AAPL</div>
      <div className="stock__name">Apple</div>
      <div className="stock__cost">1 243 ₽</div>
      <div className="stock__change">+23%</div>
      <div className="stock__counter">
        <div className="stock__counter__less">
          {' '}
          <img src={Less} alt="less_img" className="less_img"></img>{' '}
        </div>
        <div className="count">1</div>
        <div className="stock__counter__more">
          {' '}
          <img src={More} alt="more_img" className="more_img"></img>{' '}
        </div>
      </div>
      <button className="button button__normal">Купить</button>
      <div className="stock__arrow">
        <img src={Arrow} alt="arrow_img" className="arrow_img" />
      </div>
    </div>
  )
}

export default Stock