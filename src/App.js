import React, { useState, useRef } from "react";
import "./App.css";
import { AppBar, Panel, Cart, Checkout, Toaster } from "./components";
import { Switch, Route } from "react-router-dom";
import data from "./mock";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const noOfItems = cartItems.reduce((a, b) => a + parseInt(b.count), 0);
  const total = cartItems.reduce((a, b) => a + parseInt(b.count * b.price), 0);
  const panelRef = useRef(null);
  const checkoutRef = useRef(null);

  // Toaster
  const [openToaster, setOpenToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = React.useState("");

  const closeToaster = state => {
    setOpenToaster(false);
  };

  const triggerToaster = (message, type = "success") => {
    setOpenToaster(true);
    setToasterMessage(`${message}`);
    setToasterType(type);
  };
  // end of Toaster

  const viewCart = state => {
    setShowCart(state);
  };

  const addItem = item => {
    const isAvailable = cartItems.find(
      element => element.item === item.item && element.count === item.count
    );

    if (!isAvailable) {
      if (item.count < 1) {
        triggerToaster(`Items cannot be less than one`, "error");
        return;
      } else {
        setCartItems(oldState => [...oldState, item]);
        const count = item.count;
        triggerToaster(
          `${count > 1 ? "items" : "item"} added to cart`,
          "success"
        );
      }
    }
  };

  const deleteItem = item => {
    const others = cartItems.filter(element => element.item !== item.item);

    setCartItems(others);
    const count = item.count;
    triggerToaster(`${count > 1 ? "items" : "item"} deleted`, "error");
  };

  return (
    <>
      <AppBar
        data={data}
        viewCart={viewCart}
        noOfItems={noOfItems}
        cartItems={cartItems}
        deleteItem={deleteItem}
        showCart={showCart}
      />
      <Switch>
        <Route path="/checkout">
          <div id="checkout" ref={checkoutRef}>
            <Checkout
              cartItems={cartItems}
              deleteItem={deleteItem}
              total={total}
            ></Checkout>
          </div>
        </Route>
        {/* <Route path="/"> */}
        <div
          style={{
            width: "100vw",
          }}
          id="panel"
          ref={panelRef}
        >
          <Toaster
            open={openToaster}
            message={toasterMessage}
            setOpen={closeToaster}
            type={toasterType}
          ></Toaster>
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
        {/* </Route> */}
      </Switch>
    </>
  );
}

export default App;
