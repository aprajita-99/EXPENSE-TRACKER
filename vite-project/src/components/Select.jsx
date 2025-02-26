import React from 'react'

export default function Select({name , id , value ,onChange ,options ,error ,defaultValue}) {
  return (
    <div className="input-container">
        <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</label>
        <select id={id} style={{ height: "36px" }} name={name} value={value} onChange={onChange}>
          <option value="" hidden>{defaultValue}</option>
          {options.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <p className = "error">{error}</p>
      </div>
  )
}
