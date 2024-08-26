import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Footer() {
    
  const [counter, setCounter] = useState(0)
  useEffect(()=> {
      console.log('Mounting Footer');
  } , [])
  return (
      <div className='mt-10'>
          <h2>Footer</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
      </div>
  )
}

export default Footer