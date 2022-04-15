import React from 'react'

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <div value={value} onChange={(event) => onChange(event.target.value)}>
      <option disabled value=" ">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.stock}
        </option>
      ))}
    </div>
  )
}

export default MySelect
