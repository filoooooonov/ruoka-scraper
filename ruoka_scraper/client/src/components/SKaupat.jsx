import React from 'react'
import CardItem from './CardItem'

const SKaupat = ({ finalProducts }) => {
  return (
    <>
      <p className='mb-3 text-2xl font-medium text-gray-700'>Buy in S-Group 🟢</p>
      <div className='bg-secondary h-auto rounded-2xl p-2 space-y-2 mb-2'>
        { Object.entries(finalProducts).map(([name, [ price, imageUrl ]]) => {        
          return (
              <CardItem key={name} name={name} price={JSON.stringify(price)} imageUrl={imageUrl} />
          )
        }) }
      </div>
    </>
  )
}

export default SKaupat