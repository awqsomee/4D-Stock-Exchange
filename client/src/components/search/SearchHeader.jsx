import React from 'react';
// import classes from "./search_header.module.css";
import '../../utils/input/input.css';

const SearchHeader = (props) => {
  return (
    <input
      className="search"
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default SearchHeader;
