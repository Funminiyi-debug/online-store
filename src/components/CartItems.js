import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

const Cartitems = ({ cartItems, deleteItem }) => {
  const classes = useStyles();
  const handleDeleteItem = item => {
    deleteItem(item);
  };
  return (
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
                <DeleteForeverIcon
                  className="delete-icon"
                  onClick={() => handleDeleteItem(item)}
                  style={{ justifySelf: "flex-end" }}
                ></DeleteForeverIcon>
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
  );
};

export default Cartitems;
