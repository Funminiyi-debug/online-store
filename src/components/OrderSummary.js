import React from "react";
import { ListGroup } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import { Payment } from "../components";

const OrderSummary = ({
  total,
  deliveryFee = 3000,
  button = "",
  shouldPay,
}) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Typography variant="h6" className="text-center">
            Summary
          </Typography>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="font-weight-bold">SubTotal: </span>{" "}
          <span className=" float-right">{total}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          + Delivery Fee: <span className="float-right">{deliveryFee}</span>
        </ListGroup.Item>
        <ListGroup.Item className="font-weight-bold">
          Total Due: <span className="float-right">{total + deliveryFee}</span>
        </ListGroup.Item>
        {/* {shouldPay && ( */}
        <ListGroup.Item
          className="font-weight-bold"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="mx-auto" style={{ margin: "0 auto" }}>
            <Payment />
          </div>
        </ListGroup.Item>
        {/* )} */}
      </ListGroup>
    </>
  );
};

export default OrderSummary;
