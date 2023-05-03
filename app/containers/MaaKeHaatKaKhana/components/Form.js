import React from 'react';
import { TextField, makeStyles, TextareaAutosize } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  container: {
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      marginTop: props => props.delivery && 30,
    },
  },
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#B69C72',
    margin: '8px 0 5px 0',
  },
  textArea: {
    width: '100%',
    height: '90px !important',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    display: 'flex',
  },
}));

const Form = props => {
  const {
    pickup,
    delivery,
    onChangeHandler,
    state,
    isMobile,
    errorMessage,
    onChangeMessage,
    message,
    setErrorMessage,
  } = props;
  const flag = pickup ? 'pickup' : 'delivery';
  const classes = useStyles({ delivery });

  return (
    <div className={classes.container}>
      <div
        style={{
          color: '#737373',
          fontSize: isMobile ? 24 : 30,
          fontWeight: 'bold',
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        {`What is your ${pickup ? 'pickup' : 'delivery'} address?`}
      </div>
      <div className={classes.formHeaders}>Name</div>
      <TextField
        fullWidth
        size="small"
        onChange={e => onChangeHandler(e, e.target.value, flag, 'name')}
        value={state[flag].name}
        variant="outlined"
      />
      {errorMessage && errorMessage[flag] && errorMessage[flag].name && (
        <div className={classes.error}>{errorMessage[flag].name}</div>
      )}
      <div className={classes.formHeaders}>Phone Number</div>
      <TextField
        fullWidth
        value={state[flag].phonenumber}
        onChange={e => onChangeHandler(e, e.target.value, flag, 'phonenumber')}
        size="small"
        variant="outlined"
      />
      {errorMessage && errorMessage[flag] && errorMessage[flag].phonenumber && (
        <div className={classes.error}>{errorMessage[flag].phonenumber}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <div className={classes.formHeaders}>Pincode</div>
          <TextField
            fullWidth
            size="small"
            onChange={e => onChangeHandler(e, e.target.value, flag, 'pincode')}
            value={state[flag].pincode}
            variant="outlined"
          />
          {errorMessage && errorMessage[flag] && errorMessage[flag].pincode && (
            <div className={classes.error}>{errorMessage[flag].pincode}</div>
          )}
        </div>
        <div style={{ width: '45%' }}>
          <div className={classes.formHeaders}>City</div>
          <Autocomplete
            options={['Kolkata', 'Delhi', 'Chennai']}
            onChange={(e, val) => onChangeHandler(e, val, flag, 'city')}
            value={state[flag].city}
            size="small"
            disableClearable
            renderInput={params => <TextField {...params} variant="outlined" />}
          />
          {errorMessage && errorMessage[flag] && errorMessage[flag].city && (
            <div className={classes.error}>{errorMessage[flag].city}</div>
          )}
        </div>
      </div>
      <div className={classes.formHeaders}>Address line 1</div>
      <TextField
        fullWidth
        size="small"
        onChange={e => onChangeHandler(e, e.target.value, flag, 'addressline1')}
        value={state[flag].addressline1}
        variant="outlined"
      />
      {errorMessage &&
        errorMessage[flag] &&
        errorMessage[flag].addressline1 && (
          <div className={classes.error}>{errorMessage[flag].addressline1}</div>
        )}
      <div className={classes.formHeaders}>Address line 2</div>
      <TextField
        fullWidth
        size="small"
        onChange={e => onChangeHandler(e, e.target.value, flag, 'addressline2')}
        value={state[flag].addressline2}
        variant="outlined"
      />
      {errorMessage &&
        errorMessage[flag] &&
        errorMessage[flag].addressline2 && (
          <div className={classes.error}>{errorMessage[flag].addressline2}</div>
        )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div style={{ width: !isMobile && '45%' }}>
          <div className={classes.formHeaders}>Landmark</div>
          <TextField
            fullWidth
            size="small"
            onChange={e => onChangeHandler(e, e.target.value, flag, 'landmark')}
            value={state[flag].landmark}
            variant="outlined"
          />
          {errorMessage &&
            errorMessage[flag] &&
            errorMessage[flag].landmark && (
              <div className={classes.error}>{errorMessage[flag].landmark}</div>
            )}
        </div>
        <div style={{ width: !isMobile && '45%' }}>
          <div className={classes.formHeaders}>State</div>
          <Autocomplete
            options={['West Bengal', 'Delhi', 'Tamil Nadu']}
            onChange={(e, val) => onChangeHandler(e, val, flag, 'state')}
            value={state[flag].state}
            size="small"
            disableClearable
            renderInput={params => <TextField {...params} variant="outlined" />}
          />
          {errorMessage && errorMessage[flag] && errorMessage[flag].state && (
            <div className={classes.error}>{errorMessage[flag].state}</div>
          )}
        </div>
      </div>
      {pickup ? (
        <>
          <div className={classes.formHeaders}>Any Message</div>
          <TextareaAutosize
            className={classes.textArea}
            placeholder="Type what needs to be picked up..."
            onChange={onChangeMessage}
            value={message}
          />
        </>
      ) : (
        <>
          <div style={{ width: isMobile ? '75%' : '45%' }}>
            <div className={classes.formHeaders}>Schedule pickup</div>
            <TextField
              fullWidth
              size="small"
              type="date"
              onChange={e => onChangeHandler(e, e.target.value, flag, 'date')}
              value={state[flag].date}
              variant="outlined"
            />
            {errorMessage && errorMessage[flag] && errorMessage[flag].date && (
              <div className={classes.error}>{errorMessage[flag].date}</div>
            )}
          </div>
          <div className={classes.formHeaders}>Best days to pickup</div>
          <div style={{ display: 'flex', fontSize: 15 }}>
            <span style={{ color: '#B69C72' }}>Friday,</span>
            <span
              style={{ color: '#737373', fontWeight: 300, marginRight: 30 }}
            >
              23rd July, 2021
            </span>
            <span style={{ color: '#B69C72' }}>Saturday,</span>
            <span style={{ color: '#737373', fontWeight: 300 }}>
              24th July,2021
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
