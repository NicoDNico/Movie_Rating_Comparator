import React from 'react'

export default function PopUp(Prop) {
  return (
    <div className='flex fixed w-full h-full bg-black/50 justify-center align-middle' onClick={Prop.handleClick}>
        <div className=""></div>
        <button className=""></button>
    </div>
  )
}
