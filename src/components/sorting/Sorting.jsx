import React from 'react'
import Sort from '../../assets/Icons/убывание 2.svg'
import '../UI/buttons/buttons.css'
import './sorting.css'
import '../../assets/Icons/sorting_img.css'
import { useState } from 'react'
import ButtonSwith from "../../components/UI/buttons/ButtonSwitch"

const StockListFilter = () => {
  const [buttInc, setButtInc] = useState(" sorting__increase button button__sortPush")
  const [buttDec, setButtDec] = useState("sorting__decrease button button__sortNormal ")
  return (
    <div className="sorting">
      <ButtonSwith className={buttInc} onClick={() => {
          if (buttInc==="sorting__increase button button__sortNormal "){
            setButtInc("sorting__increase button button__sortPush ")
            setButtDec("sorting__decrease button button__sortNormal ")}}
    }>по росту</ButtonSwith>
      <ButtonSwith className={buttDec} onClick={() => {
          if (buttDec==="sorting__decrease button button__sortNormal "){
            setButtInc("sorting__increase button button__sortNormal ")
            setButtDec("sorting__decrease button button__sortPush ")}}
    }>по падению</ButtonSwith>
      <div className="sorting_img">
        <img src={Sort} alt="sort_img" className="sort_img" />
      </div>
    </div>
  )
}

export default StockListFilter
