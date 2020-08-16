import React, { useState } from "react";
import { Modal, Button, ListGroup, Table } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Cart = ({ show, viewCart, cartItems }) => {
  const itemsExist = cartItems.length === 0 ? false : true;
  const classes = useStyles();
  const handleClose = () => viewCart(false);
  //   const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemsExist ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>no</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        className={classes.root}
                      >
                        <Avatar
                          alt={item.item}
                          src={require(`../images/${item.title}/${item.image}`)}
                          className={classes.large}
                        />
                        {item.item}
                      </td>
                      <td>#{item.price * item.count}</td>
                      <td>{item.count}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="font-weight-bold">Total</td>
                  <td></td>
                  <td className="font-weight-bold">
                    #{cartItems.reduce((a, b) => a + b.price * b.count, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Typography variant="subtitle1">No items in Cart yet</Typography>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Keep Shopping
          </Button>
          <Button variant="success" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
