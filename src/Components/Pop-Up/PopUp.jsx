import React from 'react'

export default function PopUp(Prop) {
  return (
    <div className='flex fixed w-full h-full bg-black/50 justify-center align-middle' onClick={Prop.handleClick}>
          <input type="checkbox" name="All-switch" id="All-switch-option-1"  checked/>
          <label htmlFor='All-switch-option-1' className=''> Hola </label>
          <label class="md:w-2/3 block text-gray-500 font-bold">
            <input class="mr-2 leading-tight" type="checkbox"/>
            <span class="text-sm">
              Send me your newsletter!
            </span>
          </label>
    </div>
  )
}
