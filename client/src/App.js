import GroceryList from "./components/GroceryList";
import Kesko from "./components/Kesko";
import SKaupat from "./components/SKaupat";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from 'react';
import AboutAccordion from "./components/AboutAccordion";


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

  
  const [finalSKaupat, setFinalSKaupat] = useState({})
  const [finalKesko, setFinalKesko] = useState({})
  const [loading, setLoading] = useState(false)
  const [itemsSentToServer, setItemsSentToServer] = useState(0)

  const sendAllItems = async (e, itemsToSend) => {
    e.preventDefault();
    setLoading(true);
    
    setItemsSentToServer(itemsToSend.length)

    try {
      // Send items to server
      console.log("Sending data to the server:", itemsToSend);
      const response = await fetch("https://ruokascraper-server.vercel.app/api", { 
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ "items": itemsToSend })
      });
      console.log("Sent data to the server");

      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Get scraped data from server
      const data = await response.json();
      console.log("Data received from server:", data)
      setFinalSKaupat(data.skaupat)
      setFinalKesko(data.kesko)
      setLoading(false)
    } catch (error) {
      console.log('Error sending items to server:', error);
    }
  };


  return (
    <div className="App max-w-[1024px] mx-auto px-4 pb-20 flex flex-col">
      <Navbar />
      <div className="w-full grid md:grid-cols-2 flex-grow">
        <GroceryList items={items} addItem={addItem} deleteItem={deleteItem} sendAllItems={sendAllItems} loading={loading} />


        {loading ? (
          // Skeleton
          <div>
            <div role="status" className="space-y-2 bg-secondary md:ml-8 mt-8 md:mt-0 rounded-2xl h-auto animate-pulse p-2 ">
              {Array.from({ length: itemsSentToServer }, (_, i) => (
                <div key={i} className="p-2 rounded-lg flex items-center bg-card-item">
                  <div className="h-12 bg-white rounded-md mr-4 w-12"></div>
                  <div className="h-4 bg-secondary rounded-full w-24"></div>
                  <div className="ml-auto h-6 bg-secondary rounded-xl w-16 mr-2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : Object.keys(finalSKaupat).length > 0 && Object.keys(finalKesko).length > 0 ? (
          <div className="md:pl-8 pl-0 mt-4">
            <Kesko className="mb-8" finalProducts={finalKesko} />
            <SKaupat finalProducts={finalSKaupat} />
          </div>
        ) : Object.keys(finalSKaupat).length === 0 && Object.keys(finalKesko).length > 0 ? (
          <div className="md:pl-8 pl-0 mt-8">
            <Kesko finalProducts={finalKesko} />
            <SKaupat finalProducts={finalSKaupat} />
          </div>
        ) : Object.keys(finalKesko).length === 0 && Object.keys(finalSKaupat).length > 0 ? (
          <div className="md:pl-8 pl-0">
            <SKaupat  finalProducts={finalSKaupat} />
            <Kesko finalProducts={finalKesko} />
          </div>
        ) : <p className="font-medium text-center text-gray-600 mt-16">The result will be here...</p>}

      </div>

      {/* About Section */}
      <footer className="mt-[260px]">
        <h3 className="font-bold mb-4">About Ruokascraper</h3>
        <hr />
        <AboutAccordion title={"What is it?"} text={
          <div>
              Ruokascraper saves you time and money on groceries. 
              It creates separate grocery lists for store chains and shows only the cheapest options to help you save money on your groceries.
              <br />
              To use Ruokascraper just write the products you need to buy in the grocery list above (only in Finnish) and press "Make the list!" button. 
              You will be presented with two lists each representing a store chain with the cheapest alternatives to the items in your grocery list.
          </div>
        } />
        <hr />
        <AboutAccordion title={"How is it built"} text={
          <div>
            Ruokascraper is a React App built with Tailwind for styling and Express.js for the server-side. 
            The product data is scraped from <a href="https://www.k-ruoka.fi/">K-Ruoka </a>
            and <a href="https://www.s-kaupat.fi/">S-Kaupat</a> websites and then processed on the server side.
            <br />
            You can check out the source code <a href="https://github.com/filoooooonov/ruoka-scraper">here </a>
            and the author's portfolio <a href="https://filoooooonov.github.io/">here</a>.
          </div>
        } />
      </footer>
      
    </div>
  );
}

export default App;