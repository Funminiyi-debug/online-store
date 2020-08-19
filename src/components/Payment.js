import React, { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "react-bootstrap";

const Payment = () => {
  const [shouldPay, setshouldPay] = useState(false);
  useEffect(() => {
    setshouldPay(true);
    return () => {
      setshouldPay(false);
    };
  }, []);

  const config = {
    reference: new Date().getTime(),
    email: "user@example.com",
    amount: 30000 * 100,
    publicKey: "pk_test_15277e7e5fcea542f39442e2d11af716103f4a11",
    firstname: "Funminiyi",
    lastname: "Anwo",
  };
  const initializePayment = usePaystackPayment(config);
  const handleClick = () => {
    initializePayment();
  };
  return (
    <>
      {/* {shouldPay ? ( */}
      <div>
        <Button className=" btn btn-success" onClick={handleClick}>
          Pay Now
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

export default Payment;
