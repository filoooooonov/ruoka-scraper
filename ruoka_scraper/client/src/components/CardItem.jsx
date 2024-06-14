import React from 'react'

const CardItem = () => {
  return (
    <div className='bg-card-item h-[auto] p-2 rounded-lg w-full flex flex-row items-center '>
            <div className='flex flex-row w-full items-center gap-4'>
                <div className='bg-white rounded-md h-12 w-12 text-center'></div>
                <p className='text-md'>Product name</p>
                <p className='ml-auto font-bold text-xl pr-4'>9.90 €</p>
            </div>
    </div>
  )
}

export default CardItem