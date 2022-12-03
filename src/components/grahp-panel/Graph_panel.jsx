import React from 'react'
import Chart from '../charts/Chart'
import './graph_panel.css'
import { useState } from 'react'
import ButtonSwith from '../../components/UI/buttons/ButtonSwitch'
import Loader from '../UI/loader/Loader'

const Graph_panel = (props) => {
  const [buttDay, setButtDay] = useState('button button__sortPush')
  const [buttWeek, setButtbuttWeek] = useState('button button__sortNormal')
  const [buttMonth, setButtbuttMonth] = useState('button button__sortNormal')
  const [buttYear, setButtbuttYear] = useState('button button__sortNormal')
  const [buttAll, setButtbuttAll] = useState('button button__sortNormal')

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
          <div>{props.stock.prices.length > 0 ? <Chart stock={props?.stock} /> : <div>Акция не торгуется</div>}</div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Graph_panel
