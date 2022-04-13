import React from 'react'
// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import Logo from '../../assets/image/logo.svg';
// import Input from '../../../utils/input/Input';
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './content.css'
import StockForm from '../stockForm/StockForm.jsx'

const Content = () => {
  return (
    <div className="content">
      <div className="title">Каталог акций</div>
      <div className="container2">
        <div className="list">
          <Sorting className="sort"> </Sorting>
          <Panel className="panel" />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          <StockForm />
          {/* {<div className="number">1</div>
          <Stock className="stoks"></Stock>} */}
        </div>
      </div>
    </div>
  )
}

export default Content
