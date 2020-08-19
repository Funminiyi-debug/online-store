import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";

import { Container, Row, Col } from "react-bootstrap";
import {
  CartItems,
  OrderSummary,
  AddressVerification,
  Payment,
} from "../components";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Verify Content Details", "Delivery Location", "Payment"];
}

export default function HorizontalLabelPositionBelowStepper({
  cartItems,
  deleteItem,
  total,
}) {
  const itemsExist = cartItems.length === 0 ? false : true;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [shouldPay, setShouldPay] = useState(false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return itemsExist ? (
          <CartItems cartItems={cartItems} deleteItem={deleteItem} />
        ) : (
          <Typography
            variant="subtitle1"
            className="text-center font-weight-bold"
          >
            No items in Cart yet
          </Typography>
        );
      case 1:
        return <AddressVerification />;
      case 2:
        return <Payment />;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Container fluid className="my-3">
      <Row>
        <Col>
          <>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </>
        </Col>
        <Col xs="4">
          <OrderSummary total={total} shouldPay={shouldPay} />
        </Col>
      </Row>
    </Container>
  );
}
