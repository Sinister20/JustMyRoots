import React, { Fragment } from 'react';
import { TextField, AppBar, Button, makeStyles, Box } from '@material-ui/core';
import login4 from '../../../images/login4.png';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      marginTop: 30,
    },
  },
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#A3080C',
    margin: '8px 0 0 0',
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
  formInput: {
    marginBottom: 10,
    '& input': {
      height: 30,
      padding: 0,
      paddingLeft: 10,
      textTransform: 'capitalize',
    },
  },
}));

const FormPersonalDetails = props => {
  const { values, handleChange, back, continues } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar title="Enter Personal Details" iconClassNameLeft />
      <div>
        <img alt="img" style={{ width: '100%', height: 224 }} src={login4} />
        <div>Add Information</div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Address</div>
          <TextField
            hintText="Address"
            onChange={e => handleChange(e.target.value, 'address')}
            defaultValue={values.address}
            fullWidth
            autoComplete="none"
            variant="outlined"
          />
        </div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Pincode</div>
          <TextField
            hintText="Pincode"
            onChange={e => handleChange(e.target.value, 'pinCode')}
            defaultValue={values.pinCode}
            fullWidth
            autoComplete="none"
            variant="outlined"
          />
        </div>
        <Box mt={4}>
          <Button
            onClick={() => back()}
            className="nextMenu"
            variant="outlined"
            style={{ marginRight: 10 }}
          >
            Back
          </Button>
          <Button
            onClick={() => continues()}
            className="nextMenu"
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </div>
    </Fragment>
  );
};
export default FormPersonalDetails;
