import React from 'react';
import { makeStyles, TextareaAutosize, Button } from '@material-ui/core';
import Form from './Form';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 60,
  },
  textArea: {
    width: '90%',
    height: '108px !Important',
    marginTop: 25,
    border: '1px solid #B69C72',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
  },
  addressClass: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    margin: '25px auto',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  btn: {
    textTransform: 'capitalize',
    color: '#B69C72',
    fontSize: 25,
    height: 45,
    width: 400,
    fontWeight: 'bold',
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 317,
    },
  },
}));

const PickupAndDeliveryAddress = props => {
  const {
    onChangeHandler,
    state,
    isMobile,
    onChangeTextArea,
    textAreaValue,
    errorMessage,
    onClickHandler,
    onChangeMessage,
    message,
    setErrorMessage,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ fontSize: isMobile ? 24 : 30, fontWeight: 'bold' }}>
        <span style={{ color: '#B69C72', marginRight: 6 }}>
          What needs to be
        </span>
        <span style={{ color: '#737373' }}>picked up?</span>
      </div>
      <TextareaAutosize
        className={classes.textArea}
        placeholder="Type what needs to be picked up..."
        onChange={onChangeTextArea}
        value={textAreaValue}
      />
      <div className={classes.addressClass}>
        <Form
          pickup
          onChangeHandler={onChangeHandler}
          state={state}
          isMobile={isMobile}
          errorMessage={errorMessage}
          onChangeMessage={onChangeMessage}
          message={message}
          setErrorMessage={setErrorMessage}
        />
        <Form
          delivery
          onChangeHandler={onChangeHandler}
          state={state}
          isMobile={isMobile}
          errorMessage={errorMessage}
          onChangeMessage={onChangeMessage}
          message={message}
          setErrorMessage={setErrorMessage}
        />
      </div>
      <div
        style={{
          marginTop: 25,
          display: isMobile && 'flex',
          justifyContent: isMobile && 'center',
        }}
      >
        <Button
          onClick={onClickHandler}
          variant="outlined"
          className={classes.btn}
        >
          Proceed to cart
        </Button>
      </div>
    </div>
  );
};

export default PickupAndDeliveryAddress;
