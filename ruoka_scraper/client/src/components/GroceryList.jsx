import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from 'react';

const GroceryList = ({ items, addItem, deleteItem, sendAllItems }) => {

  const [newItem, setNewItem] = useState("")

  
  function handleSubmitItems(e) {
    e.preventDefault()
    addItem(newItem)
    setNewItem("")
  } 

  return (
    <div className='w-full pr-8'>
      <p className='mb-3 text-2xl font-medium text-gray-700'>Your grocery list 🍇</p>
      <div className='h-auto bg-white border-[8px] border-secondary rounded-2xl px-3 py-3 mb-4'>
          <ul>
            {items.map(item => {
              return (
              <li key={item.id} className='group flex justify-between items-center text-lg py-2 pl-4 border-b border-gray-200'>
                {item.title}
                <RiDeleteBin5Line onClick={() => deleteItem(item.id)} className='mr-2 cursor-pointer invisible group-hover:visible' />
                </li>
              )
            })}
          </ul>
          <form onSubmit={handleSubmitItems}>
              <input 
                type='text' 
                className='text-lg py-2 pl-4 rounded-lg cursor-pointer w-full outline-none'
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)} 
                required autoFocus
                />
            </form>
      </div>
      <div className='flex flex-row justify-between'>
          <button type='submit' onClick={handleSubmitItems} className='btn-secondary'>
              <FiPlusCircle />
              Add new item
          </button>
          
          <button type='submit' onClick={sendAllItems} all_items={items} className='btn-primary'>
              Find cheapest options!
          </button>
      </div>
    </div>
    
  )
}

export default GroceryList