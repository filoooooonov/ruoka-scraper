import React from 'react'

const CardItem = ({ name, price, imageUrl }) => {
  return (
    <div className='bg-card-item h-[auto] p-2 rounded-lg w-full flex flex-row items-center '>
            <div className='flex flex-row w-full items-center gap-4'>
                <img className="rounded-md h-12 w-12 object-contain bg-white" src={imageUrl} alt={name} />
                <p className='font-medium leading-5'>{ name }</p>
                <p className='ml-auto font-bold text-xl pr-4 text-nowrap'>{ parseFloat(price).toFixed(2) } €</p>
            </div>
      </div>
  )
}

export default CardItem