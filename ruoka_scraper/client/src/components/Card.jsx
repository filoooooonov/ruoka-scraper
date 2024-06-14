import React from 'react'
import CardItem from './CardItem'


const Card = () => {
  return (
    <div className='bg-secondary h-auto rounded-2xl p-2 space-y-2 mb-4'>
        <div className='bg-card-item h-[auto] p-2 rounded-lg w-full flex flex-row items-center '>
            <div className='flex flex-row w-full items-center gap-4'>
                <div className='bg-white rounded-md h-12 w-12 text-center'></div>
                <p className='text-md'>Product name</p>
                <p className='ml-auto font-bold text-xl pr-4'>9.90 €</p>
            </div>
      </div>
    </div>
  )
}

export default Card