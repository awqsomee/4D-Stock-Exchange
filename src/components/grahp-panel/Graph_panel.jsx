import React, { useEffect } from 'react'
import Chart from '../charts/Chart'
import './graph_panel.css'
import { useState } from 'react'
import ButtonSwith from '../../components/UI/buttons/ButtonSwitch'
import Loader from '../UI/loader/Loader'
import StatisticCard from '../statisticCard/StatisticCard'

const Graph_panel = (props) => {
  const [buttDay, setButtDay] = useState('button button__sortPush')
  const [buttWeek, setButtbuttWeek] = useState('button button__sortNormal')
  const [buttMonth, setButtbuttMonth] = useState('button button__sortNormal')
  const [buttYear, setButtbuttYear] = useState('button button__sortNormal')
  const [buttAll, setButtbuttAll] = useState('button button__sortNormal')
  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(1000000)

  useEffect(() => {
    statisticPrice()
    console.log(maxPrice, minPrice)
  }, [])

  const statisticPrice = () => {
    let prices = props.stock.prices
    console.log(prices)
    prices.map((el) => {
      if (el.close != null) {
        if (el.close > maxPrice) {
          setMaxPrice(el.close)
          console.log('max', maxPrice)
        }
        if (el.close < minPrice) {
          setMinPrice(el.close)
          console.log('min', minPrice)
        }
      }
    })
  }

  return (
    <div>
      <div className="panel_wrap">
        <div className="selectors">
          <ButtonSwith
            className={buttDay}
            onClick={() => {
              if (buttDay === 'button button__sortNormal') {
                setButtDay('button button__sortPush')
                setButtbuttWeek('button button__sortNormal')
                setButtbuttMonth('button button__sortNormal')
                setButtbuttYear('button button__sortNormal')
                setButtbuttAll('button button__sortNormal')
              }
            }}
          >
            день
          </ButtonSwith>
          <ButtonSwith
            className={buttWeek}
            onClick={() => {
              if (buttWeek === 'button button__sortNormal') {
                setButtDay('button button__sortNormal')
                setButtbuttWeek('button button__sortPush')
                setButtbuttMonth('button button__sortNormal')
                setButtbuttYear('button button__sortNormal')
                setButtbuttAll('button button__sortNormal')
              }
            }}
          >
            неделя
          </ButtonSwith>
          <ButtonSwith
            className={buttMonth}
            onClick={() => {
              if (buttMonth === 'button button__sortNormal') {
                setButtDay('button button__sortNormal')
                setButtbuttWeek('button button__sortNormal')
                setButtbuttMonth('button button__sortPush')
                setButtbuttYear('button button__sortNormal')
                setButtbuttAll('button button__sortNormal')
              }
            }}
          >
            месяц
          </ButtonSwith>
          <ButtonSwith
            className={buttYear}
            onClick={() => {
              if (buttYear === 'button button__sortNormal') {
                setButtDay('button button__sortNormal')
                setButtbuttWeek('button button__sortNormal')
                setButtbuttMonth('button button__sortNormal')
                setButtbuttYear('button button__sortPush')
                setButtbuttAll('button button__sortNormal')
              }
            }}
          >
            год
          </ButtonSwith>
          <ButtonSwith
            className={buttAll}
            onClick={() => {
              if (buttAll === 'button button__sortNormal') {
                setButtDay('button button__sortNormal')
                setButtbuttWeek('button button__sortNormal')
                setButtbuttMonth('button button__sortNormal')
                setButtbuttYear('button button__sortNormal')
                setButtbuttAll('button button__sortPush')
              }
            }}
          >
            все время
          </ButtonSwith>
        </div>
        {props?.stock?.prices ? (
          props.stock.prices.length > 0 ? (
            <div className="data">
              <Chart stock={props?.stock} id={props?.id} />
              <StatisticCard title1={'Max цена акции'} title2={'Min цена акции'} data1={maxPrice} data2={minPrice}>
                {/* <button className="button button__normal">Купить</button> */}
              </StatisticCard>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              Акция не торгуется
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Graph_panel
