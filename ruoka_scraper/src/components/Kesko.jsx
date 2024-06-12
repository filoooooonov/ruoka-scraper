import React from 'react'
import Card from './Card'


const Kesko = ({ items }) => {

  return (
    <div>
      <p className='mb-3 text-2xl font-medium text-gray-700'>Buy in Kesko 🟠</p>
      {items.map(item => {
        return (
          <p key={item.id}>{item.title}</p>
        )
      })}
      <Card />
    </div>
  )
}

export default Kesko