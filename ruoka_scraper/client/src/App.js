import GroceryList from "./components/GroceryList";
import Kesko from "./components/Kesko";
import SKaupat from "./components/SKaupat";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from 'react';

function App() {


  // Get items from the local storage or set to []
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  // Store items in local storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(items))
  }, [items])
  

  const addItem = (newItem) => { 
    if (newItem.trim() === '') {
      alert('Please enter an item!');
      return;
    }
    setItems((currentItems) => [
      ...currentItems,
      { id: crypto.randomUUID(), title: newItem },
    ]);
  };

  
  const deleteItem = (id) => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  async function sendAllItems(e) {
    e.preventDefault()
    console.log(items)


    await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "items": items
      })
    })

    // await fetch("/api").then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     console.log(data)
    //   }
    // )
    return;
  }

  

  return (
    <div className="App max-w-[1024px] mx-auto px-4">
      <Navbar />
      <div className="w-full grid grid-cols-2">
        <GroceryList items={items} addItem={addItem} deleteItem={deleteItem} sendAllItems={sendAllItems} />
        <div className="pl-8">
          <Kesko />
          <SKaupat />
        </div>
      </div>
    </div>
  );
}

export default App;