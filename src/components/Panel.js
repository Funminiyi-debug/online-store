import React from "react";
import Product from "./Product";
import "./Panel.css";
import { Card, CardGroup } from "react-bootstrap";
import { Typography } from "@material-ui/core";

const Panel = ({ title, data, addItem }) => {
  return (
    <Card className="text-center" border="light" key={title.toString()}>
      <Card.Header>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Card.Header>
      <Card.Body className="panel">
        {data.map(({ name, price, image }) => (
          <CardGroup key={name.toString()}>
            <Product
              item={name}
              price={price}
              image={image}
              title={title}
              addItem={addItem}
            ></Product>
          </CardGroup>
        ))}
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  );
};

export default Panel;
