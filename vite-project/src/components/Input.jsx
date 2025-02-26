import React, { useEffect, useRef } from 'react'

export default function Input({name , value , id ,onChange ,error ,refer}) {

  const reference = useRef(null);
  useEffect(()=>{
    if(refer === 1){
      reference.current.focus();
    }
  },[refer])
  
  return (
    <div className="input-container">
            <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</label>
            <input id={id} name={name} value={value} onChange = {onChange} ref = {reference}/>
            <p className = "error">{error}</p>
          </div>
  )
}
