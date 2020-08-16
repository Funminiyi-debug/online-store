import React, { useState } from "react";
import "./App.css";
import { AppBar, Product, Panel, Cart } from "./components";
import data from "./mock";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const viewCart = state => {
    setShowCart(state);
  };

  const addItem = item => {
    const isAvailable = cartItems.find(
      element => element.item === item.item && element.count === item.count
    );
    if (!isAvailable) {
      setCartItems(oldState => [...oldState, item]);
    }
  };

  return (
    <>
      <AppBar data={data} viewCart={viewCart} />
      <div
        style={{
          width: "100vw",
        }}
      >
        {data.category.map(category => {
          return (
            <Panel
              key={category.type.toString()}
              title={category.type}
              data={category.goods}
              addItem={addItem}
            ></Panel>
          );
        })}
      </div>
      <Cart show={showCart} viewCart={viewCart} cartItems={cartItems} />
    </>
  );
}

export default App;
