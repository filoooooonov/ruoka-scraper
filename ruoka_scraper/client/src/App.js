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
  

  const addItem = (newItem, e) => {
    e.preventDefault() 
    if (newItem.trim() === '') {
      alert('Please enter an item!');
      return;
    }
    console.log("GOT NEW ITEM", newItem)
    return new Promise((resolve) => {
      setItems((currentItems) => {
        const updatedItems = [
          ...currentItems,
          { id: crypto.randomUUID(), title: newItem }
        ];
        resolve(updatedItems)
        return updatedItems;
      })
    })
    
    
  };
  

  const deleteItem = (id) => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }


  const [finalProducts, setFinalProducts] = useState({})
  const [loading, setLoading] = useState(false)
  const [itemsSentToServer, setItemsSentToServer] = useState(0)

  const sendAllItems = async (e, itemsToSend) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Sending data to the server:", itemsToSend);
    setItemsSentToServer(itemsToSend.length)

    try {
      // Send items to server
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ "items": itemsToSend })
      });

      // Get scraped data from server
      const data = await response.json();
      console.log("Data received from server:", data)
      setFinalProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error sending items to server:', error);
    }

  };


  return (
    <div className="App max-w-[1024px] mx-auto px-4">
      <Navbar />
      <div className="w-full grid grid-cols-2 ">
        <GroceryList items={items} addItem={addItem} deleteItem={deleteItem} sendAllItems={sendAllItems} loading={loading} />


        {loading ? (
          <div>
            <div role="status" className="space-y-2 bg-secondary ml-8 rounded-2xl h-auto animate-pulse p-2 ">
              {Array.from({ length: itemsSentToServer }, (_, i) => (
                <div key={i} className="p-2 rounded-lg flex items-center bg-card-item">
                  <div className="h-12 bg-white rounded-md mr-4 w-12"></div>
                  <div className="h-4 bg-secondary rounded-full w-24"></div>
                  <div className="ml-auto h-6 bg-secondary rounded-xl w-16 mr-2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : Object.keys(finalProducts).length > 0 ? (
          <div className="pl-8">
            <Kesko />
            <SKaupat finalProducts={finalProducts} />
          </div>
        ) : <p className="font-medium text-center text-black">The result will be here</p>}

      </div>
    </div>
  );
}

export default App;