import React, { Fragment } from 'react';
import { TextField, AppBar, Button, makeStyles, Box } from '@material-ui/core';
import login5 from '../../../images/login5.png';

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
  formInput: {
    marginBottom: 10,
    '& input': {
      height: 30,
      padding: '0 10px',
    },
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

const Step3 = props => {
  const { values, handleChange, back, continues } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar title="Enter Personal Details" iconClassNameLeft />
      <div>
        <img alt="img" style={{ width: '100%', height: 224 }} src={login5} />
        <div>Add Information</div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Birthday</div>
          <TextField
            type="date"
            defaultValue={values.dob}
            onChange={e => handleChange(e.target.value, 'dob')}
            id="Birthday"
            autoComplete="none"
            fullWidth
            variant="outlined"
            hintText="Birthday"
          />
        </div>

        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Anniversary</div>
          <TextField
            type="date"
            id="Anniversary"
            autoComplete="none"
            fullWidth
            variant="outlined"
            hintText="Anniversary"
            onChange={e => handleChange(e.target.value, 'anniversary')}
            defaultValue={values.anniversary}
          />
        </div>
        <div className={classes.formInput}>
          <div className={classes.formHeaders}>Ethnic Identity</div>

          <TextField
            hintText="Ethnic Identity"
            onChange={e => handleChange(e.target.value, 'ethnicIdentity')}
            defaultValue={values.ethnicIdentity}
            fullWidth
            autoComplete="none"
            variant="outlined"
          />
        </div>
        <Box>
          <Button
            onClick={() => back()}
            variant="outlined"
            style={{ marginRight: 10 }}
            className="nextMenu"
          >
            Back
          </Button>
          <Button
            onClick={() => continues()}
            variant="contained"
            className="nextMenu"
          >
            Next
          </Button>
        </Box>
      </div>
    </Fragment>
  );
};
export default Step3;
