import React from "react";
import "./input.css";

const Input = ({props}) => {
    return (
      
        <input type={props.type} plaseholder={props.plaseholder}/>
    
    );
  }