import React, { Fragment } from 'react';
import {
  TextField,
  AppBar,
  Button,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import login6 from '../../../images/login6.png';

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
      textTransform: 'capitalize',
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

const Step4 = props => {
  const { values, handleChange, back, continues } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar title="Enter Personal Details" iconClassNameLeft />
      <div>
        <img alt="img" style={{ width: '100%', height: 224 }} src={login6} />
        <div>Add Information</div>
        <FormControl
          component="fieldset"
          style={{ width: '100%'}}
        >
          <FormLabel className={classes.formHeaders} component="legend">
            Gender
          </FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            className={classes.radioFilter}
            value={values.gender}
            onChange={e => handleChange(e.target.value, 'gender')}
          >
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value="male"
              control={<Radio color="primary" size="small" />}
              label="Male"
            />
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value="female"
              control={<Radio color="primary" size="small" />}
              label="Female"
            />
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value="other"
              control={<Radio color="primary" size="small" />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>

        <FormControl
          component="fieldset"
          fullWidth
        >
          <FormLabel className={classes.formHeaders} component="legend">
            Preference
          </FormLabel>
          <RadioGroup
            aria-label="isVeg"
            name="Preference"
            className={classes.radioFilter}
            value={values.isVeg}
            onChange={e => handleChange(e.target.value, 'isVeg')}
          >
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value={'true'}
              control={<Radio color="primary" size="small" />}
              label="Veg"
            />
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value={'false'}
              control={<Radio color="primary" size="small" />}
              label="Non Veg"
            />
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value=""
              control={<Radio color="primary" size="small" />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
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
      </div>
    </Fragment>
  );
};
export default Step4;
