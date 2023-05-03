import React from 'react';
import {
  TextField,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ReactPhoneInput from 'react-phone-input-material-ui';
const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      // marginTop: 30,
    },
  },
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#A2080C',
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
  field: {
    margin: '10px 0',
    width: '100% !important',
  },
  phoneBox: {

    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
  },
}));

const Form = props => {
  const {
    onChangeHandler,
    state,
    isMobile,
    errorMessage,
    onChangeMessage,
    message,
    setErrorMessage,
    locationList,
    stateList,
    pinList,
    createAddrOnly,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
    
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <TextField
            fullWidth
            size="small"
            margin='normal'
            onChange={e => onChangeHandler(e, e.target.value, 'name')}
            value={state.name}
            autoComplete="none"
            variant="outlined"
            label="Name"
            // error={errorMessage && errorMessage.name}
            // helperText={errorMessage && errorMessage.name}
          />
        </div>
        <div style={{ width: '48%' }}>
          <Autocomplete
            options={stateList}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option._id === value._id}
            onChange={(e, val) => onChangeHandler(e, val, 'stateId')}
            value={state.stateId}
            size="small"
            disableClearable
            renderInput={params => <TextField
              {...params}
              label="State"
              margin='normal'

              variant="outlined"
              error={errorMessage && errorMessage.stateId}
              helperText={errorMessage && errorMessage.stateId}
            />}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <Autocomplete
            options={locationList}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option._id === value._id}
            onChange={(e, val) => onChangeHandler(e, val, 'cityId')}
            value={state.cityId}
            size="small"
            disableClearable
            disabled={!state.stateId || locationList.length === 0}
            renderInput={params => <TextField
              {...params}
              label="City"
              variant="outlined"
              margin='normal'
              error={errorMessage && errorMessage.cityId}
              helperText={errorMessage && errorMessage.cityId}
            />}

          />
        </div>
        <div style={{ width: '48%' }}>
          <Autocomplete
            options={pinList}
            getOptionSelected={(option, value) => option._id === value._id}
            getOptionLabel={option => option.pin}
            onChange={(e, val) => onChangeHandler(e, val, 'pinId')}
            value={state.pinId}
            size="small"
            
            disableClearable
            disabled={
              !state.stateId ||
              locationList.length === 0 ||
              !state.cityId ||
              !state.cityId.name ||
              pinList.length === 0
            }
            renderInput={params => <TextField {...params}
              variant="outlined"
              label="Pincode"
              margin='normal'
              error={errorMessage && errorMessage.pinId}
              helperText={errorMessage && errorMessage.pinId}
            />}
          />
        
        </div>
      </div>
    
      <TextField
        fullWidth
        autoComplete="none"
        size="small"
        margin='normal'
        onChange={e => onChangeHandler(e, e.target.value, 'addressLineOne')}
        value={state.addressLineOne}
        variant="outlined"
        placeholder='Address line one'
        label="Address line one"
        error={errorMessage && errorMessage.addressLineOne}
        helperText={errorMessage && errorMessage.addressLineOne}
      />
    
      <TextField
        fullWidth
        autoComplete="none"
        size="small"
        margin='normal'
        onChange={e => onChangeHandler(e, e.target.value, 'addressLineTwo')}
        value={state.addressLineTwo}
        variant="outlined"
        label="Address line two"   
        placeholder='Address line two'     
      />
      <div>
    
        <TextField
          fullWidth
          autoComplete="none"
          size="small"
          onChange={e => onChangeHandler(e, e.target.value, 'landmark')}
          value={state.landmark}
          variant="outlined"
          // error={errorMessage && errorMessage.landmark}
          // helperText={errorMessage && errorMessage.landmark}
          label="Landmark"
          margin='normal'
        />
      </div>
      <div className={classes.phoneBox  }>
        <div className={`${classes.formHeaders}`}>Mobile</div>
        <ReactPhoneInput
          fullWidth
          value={state.mobile|| state.phoneNumber}
          country="in"
          defaultCountry={['IN', 'cw', 'kz']}
          countryCodeEditable={false}
          onChange={e => {
            onChangeHandler(e, e, 'mobile');
          }}
          
          inputStyle={{
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            borderBottom: '1px solid #e0e0e0',
            // padding: '10px',
          }}
          component={TextField}
          inputClass={classes.field}
        />
        {errorMessage && (errorMessage.mobile || errorMessage.phoneNumber)  && (
          <div className={classes.error}>{errorMessage.phoneNumber}</div>
        )}
      </div>
      {
        <div>
          <TextField
            fullWidth
            autoComplete="none"
            size="small"
            type="email"
            onChange={e => onChangeHandler(e, e.target.value, 'email')}
            value={state.email}
            variant="outlined"
            required
            error={errorMessage && errorMessage.email}
            helperText={errorMessage && errorMessage.email}
            label="Email"
            margin='normal'
          />
        </div>
      }

      <div>
        {!createAddrOnly && (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isDefault}
                onChange={e => {
                  onChangeHandler(e, e.target.checked, 'isDefault');
                }}
              />
            }
            label="Set as default Delivery address"
          />
        )}
      </div>
    </div>
  );
};

export default Form;
