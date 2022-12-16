import React from 'react'
import Sort from '../../assets/Icons/убывание 2.svg'
import '../UI/buttons/buttons.css'
import './sorting.css'
import { useState } from 'react'
import ButtonSwith from '../../components/UI/buttons/ButtonSwitch'

const StockListFilter = (props) => {
  const [buttInc, setButtInc] = useState('sorting__increase button button__sortNormal')
  const [buttDec, setButtDec] = useState('sorting__decrease button button__sortPush')

  const [sortImg, setSortImg] = useState('decreaseSort')
  return (
    <div className="sorting">
      <ButtonSwith
        className={buttInc}
        onClick={() => {
          if (buttInc === 'sorting__increase button button__sortNormal') {
            console.log(1)
            setButtInc('sorting__increase button button__sortPush')
            setButtDec('sorting__decrease button button__sortNormal')
            props.setFilter('name')
          }
        }}
      >
        наименование
      </ButtonSwith>
      <ButtonSwith
        className={buttDec}
        onClick={() => {
          if (buttDec === 'sorting__decrease button button__sortNormal') {
            console.log(2)
            setButtInc('sorting__increase button button__sortNormal')
            setButtDec('sorting__decrease button button__sortPush')
          }
          props.setFilter('change')
        }}
      >
        изменение
      </ButtonSwith>
      <button
        className="sorting__img"
        onClick={() => {
          if (sortImg == 'decreaseSort') {
            setSortImg('increaseSort')
            props.setSort(true)
          } else {
            setSortImg('decreaseSort')
            props.setSort(false)
          }
        }}
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={sortImg}
        >
          <path
            d="M7.76252 22.275C7.65002 22.3875 7.53752 22.5 7.31252 22.5C7.08752 22.5 6.97502 22.3875 6.86252 22.275L3.60002 19.0125C3.37502 18.7875 3.37502 18.45 3.60002 18.225C3.82502 18 4.16252 18 4.38752 18.225L6.75002 20.5875V5.0625C6.75002 4.725 6.97502 4.5 7.31252 4.5C7.65002 4.5 7.87502 4.725 7.87502 5.0625V20.5875L10.2375 18.225C10.4625 18 10.8 18 11.025 18.225C11.25 18.45 11.25 18.7875 11.025 19.0125L7.76252 22.275ZM14.0625 6.75C13.725 6.75 13.5 6.525 13.5 6.1875C13.5 5.85 13.725 5.625 14.0625 5.625H23.0625C23.4 5.625 23.625 5.85 23.625 6.1875C23.625 6.525 23.4 6.75 23.0625 6.75H14.0625ZM14.0625 11.25C13.725 11.25 13.5 11.025 13.5 10.6875C13.5 10.35 13.725 10.125 14.0625 10.125H20.8125C21.15 10.125 21.375 10.35 21.375 10.6875C21.375 11.025 21.15 11.25 20.8125 11.25H14.0625ZM14.0625 15.75C13.725 15.75 13.5 15.525 13.5 15.1875C13.5 14.85 13.725 14.625 14.0625 14.625H18.5625C18.9 14.625 19.125 14.85 19.125 15.1875C19.125 15.525 18.9 15.75 18.5625 15.75H14.0625ZM14.0625 20.25C13.725 20.25 13.5 20.025 13.5 19.6875C13.5 19.35 13.725 19.125 14.0625 19.125H16.3125C16.65 19.125 16.875 19.35 16.875 19.6875C16.875 20.025 16.65 20.25 16.3125 20.25H14.0625Z"
            fill="#394249"
            stroke="#394249"
            strokeMiterlimit="10"
          />
        </svg>
      </button>
    </div>
  )
}

export default StockListFilter
