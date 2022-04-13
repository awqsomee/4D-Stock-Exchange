import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import Logo from '../../assets/image/logo.svg';
// import Input from '../../../utils/input/Input';
import Panel from '../panel/Panel.jsx';
import Stock from "../stocks/Stock"
import './content.css';

const Content = () => {
  return (
    <div className="content">
      <div className="title">Каталог акций</div>
      <div className="container2">
        
        <div className="list">
          <div className='sort'> </div>
          <Panel className="panel"/>
          <Stock className='stoks'></Stock>
        </div>
      </div>
    </div>
  );
};

export default Content;