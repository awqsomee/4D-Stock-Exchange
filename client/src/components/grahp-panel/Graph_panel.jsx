import React from 'react'
import Chart from '../charts/Chart'
import './graph_panel.css'

const Graph_panel = (props) => {
  return (
    <div>
      <div className="selectors">
        <button className="slectors__day button button__sortNormal">день</button>
        <button className="slectors__week button button__sortPush">неделя</button>
        <button className="slectors__month button button__sortNormal">месяц</button>
        <button className="slectors__year button button__sortNormal">год</button>
        <button className="slectors__all button button__sortNormal">все время</button>
      </div>
      <Chart stock={props.stock} />
      <div className="graph"></div>
      <div className="MMPanel"> </div>
    </div>
  )
}

export default Graph_panel
