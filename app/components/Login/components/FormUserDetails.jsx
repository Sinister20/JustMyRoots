import React, { Fragment } from 'react';
import { TextField, AppBar, Button, makeStyles } from '@material-ui/core';
import login3 from '../../../images/login3.png';

const useStyles = makeStyles(theme => ({
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#A3080C',
    margin: '8px 0 0 0',
  },
  formInput: {
    marginBottom: 10,
    '& input': {
      height: 30,
      padding: 0,
      paddingLeft: 10,
      textTransform: 'capitalize',
    },
   
  },
  errorMsg: {
    marginLeft: 10,
    color: '#EF4423',
    fontSize: 14,
  },
}));
const FormUserDetails = props => {
  const { values, handleChange, continues,errorMessage } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar title="Enter User Details" iconClassNameLeft />
      <div>
        <img alt="img" style={{ width: '100%', height: 224 }} src={login3} />
        <div>Add Information</div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>First Name</div>
          <TextField
            hintText="Please Enter First Name"
            onChange={e => handleChange(e.target.value, 'firstName')}
            defaultValue={values.firstName}
            fullWidth
            autoComplete="none"
            variant="outlined"
            required
          />
            <div className={classes.errorMsg}>{errorMessage.firstname}</div>

        </div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Last Name</div>
          <TextField
            hintText="Please Enter Last Name"
            onChange={e => handleChange(e.target.value, 'lastName')}
            defaultValue={values.lastName}
            fullWidth
            autoComplete="none"
            variant="outlined"
            required
          />
                      <div className={classes.errorMsg}>{errorMessage.lastname}</div>

        </div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>City</div>
          <TextField
            hintText="Enter Your City"
            onChange={e => handleChange(e.target.value, 'city')}
            defaultValue={values.city}
            fullWidth
            autoComplete="none"
            variant="outlined"
            required
          />
                      <div className={classes.errorMsg}>{errorMessage.city}</div>

        </div>
        <Button
          onClick={() => continues()}
          className="nextMenu"
          variant="contained"
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FormUserDetails;
