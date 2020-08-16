import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Divider, Button, TextField, Typography } from "@material-ui/core";
// const

const Product = ({ item, price, image, title, addItem }) => {
  const [add, setAdd] = useState(false);
  const [numberPurchased, setNumberPurchased] = useState(0);

  const toggleCart = () => {
    setAdd(true);
    setNumberPurchased(1);
  };
  const handleBlur = e => {
    setAdd(false);
    setNumberPurchased(e.target.value);
    const purchase = {
      title,
      item,
      price,
      image,
      count: e.target.value || numberPurchased,
    };

    addItem(purchase);
  };

  return (
    <>
      <Card style={{ width: "16rem", margin: "1rem" }} key={item.toString()}>
        <Card.Img
          variant="top"
          src={require(`../images/${title}/${image}`)}
          style={{ height: "16rem", width: "14rem" }}
        />
        <Divider></Divider>
        <Card.Body>
          <Typography variant="body1" display="block" gutterBottom>
            {item}
          </Typography>
        </Card.Body>
        <ListGroup>
          <ListGroupItem>
            <Typography variant="overline" display="block" gutterBottom>
              Price: #{price}
            </Typography>
          </ListGroupItem>
          {!add && (
            <ListGroupItem style={{ margin: "0 auto", border: "none" }}>
              <Button variant="contained" onClick={toggleCart}>
                Add to Cart
              </Button>
            </ListGroupItem>
          )}
          {add && (
            <ListGroupItem style={{ margin: "0 auto", border: "none" }}>
              <TextField
                onBlur={handleBlur}
                id="outlined-number"
                label="Number"
                type="number"
                autoFocus
                defaultValue={1}
                // value={numberPurchased}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </ListGroupItem>
          )}{" "}
        </ListGroup>
      </Card>
    </>
  );
};

export default Product;
