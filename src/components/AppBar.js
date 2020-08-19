import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
// bootstrap
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  DropdownButton,
  Dropdown,
  Badge,
} from "react-bootstrap";
// material ui
import {
  Drawer,
  List,
  ListItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useMediaQuery } from "react-responsive";
import "./AppBar.css";
import { makeStyles } from "@material-ui/core/styles";
import { Cart } from "../components";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const AppBar = ({
  data,
  viewCart,
  noOfItems,
  cartItems,
  deleteItem,
  showCart,
}) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1162 });

  // to toggle drawer
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  // drawer items
  const list = anchor => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {data.category.map(category => (
          <Fragment key={category.type.toString()}>
            <ListItem button htmlColor="green">
              <Accordion style={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  className="accordion"
                  bg="dark"
                >
                  <Typography className={classes.heading}>
                    {category.type}
                  </Typography>
                </AccordionSummary>
                {category.items.map(item => {
                  return (
                    <AccordionDetails
                      className="accordion-details"
                      key={item.toString()}
                    >
                      <Typography>{item}</Typography>
                    </AccordionDetails>
                  );
                })}
              </Accordion>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );

  const renderSidebar = () => {
    return (
      <React.Fragment key="left">
        <Drawer anchor={"left"} open={drawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    );
  };
  const generateDropdowns = () => {
    return data.category.map(category => (
      <DropdownButton
        id="dropdown-basic-button"
        color="default"
        title={category.type}
        key={category.type.toString()}
        variant="secondary"
      >
        {category.items.map(item => {
          return (
            <Dropdown.Item href="#/action-1" key={item.toString()}>
              {item}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    ));
  };

  const handleViewCart = () => {
    viewCart(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">ShopNow</Link>
        </Navbar.Brand>

        <Nav>
          <Nav.Link onClick={toggleDrawer(true)}>Categories</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleViewCart}>
            <ShoppingCartIcon /> Cart <Badge variant="light">{noOfItems}</Badge>
          </Nav.Link>
        </Nav>

        {/* {!isMobile && (
          <ButtonGroup className="navbar-2">{generateDropdowns()}</ButtonGroup>
        )} */}

        {renderSidebar()}

        <Form inline className="form ml-auto mr-sm-2">
          <FormControl
            type="text"
            placeholder="Search"
            className="justify-content-end"
          />
        </Form>
        <Cart
          show={showCart}
          viewCart={viewCart}
          cartItems={cartItems}
          deleteItem={deleteItem}
        />
      </Navbar>
    </>
  );
};

export default AppBar;
