import React from 'react'
import Sort from '../../assets/Icons/убывание 2.svg'
import '../UI/buttons/buttons.css'
import './sorting.css'
import '../../assets/Icons/sorting_img.css'

const StockListFilter = () => {
  return (
    <div className="sorting">
      <button className="increase button button__sortPush">по росту</button>
      <button className="decrease button button__sortNormal">по падению</button>
      <div className="sorting_img">
        <img src={Sort} alt="sort_img" className="sort_img" />
      </div>
    </div>
  )
}

export default StockListFilter
