import React from 'react'
import './Paints.scss';

const Paints = ({ paint }) => {
    console.log(paint.color)
  return (
    <div className={`paint-container ${paint.color.toLowerCase()}`} style={{color: paint.color === 'Black' ? 'white' : 'black'}}>
        <div className="paint-color">{paint.color}</div>
        <div className="paint-quantity">Quantity: {paint.quantity}</div>
    </div>
  )
}

export default Paints