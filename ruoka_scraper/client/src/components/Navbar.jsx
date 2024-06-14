import React from 'react'
import { RxOpenInNewWindow } from "react-icons/rx";


const Navbar = () => {
  return (
    <div className='py-4 mb-8 flex flex-col sm:justify-between sm:items-center sm:flex-row'>
        <div className='flex flex-col'>
            <h1 className='text-black font-bold text-5xl pr-32 pb-2'>Ruokascraper</h1>
            <p className='text-gray-500 inline-flex items-center pb-4'>
                Built by <a href="https://filoooooonov.github.io" className='mx-1 underline cursor-pointer'> Aleksei</a>
                <RxOpenInNewWindow /> 
            </p>
        </div>
        
        <input type="text" placeholder="Search for products..." className="input input-error border-0 lg:w-[50%] bg-secondary flex-grow" />
    </div>
  )
}

export default Navbar