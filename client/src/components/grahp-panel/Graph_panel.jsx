import React from 'react'
import "./graph_panel.css"
import Canvas from "../graph/Canvas"

const Graph_panel = () => {
  return (
    <div >
      <div className='selectors'>
        <button className='slectors__day button button__sortNormal'>день</button>
        <button className='slectors__week button button__sortPush'>неделя</button>
        <button className='slectors__month button button__sortNormal'>месяц</button>
        <button className='slectors__year button button__sortNormal'>год</button>
        <button className='slectors__all button button__sortNormal'>все время</button>
      </div>
      <div className='graph'>
        <Canvas/>
      </div>
      <div className='MMPanel'> </div>
    </div>
  )
}

export default Graph_panel