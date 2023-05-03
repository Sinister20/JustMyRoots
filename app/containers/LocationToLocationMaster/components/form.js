/* eslint-disable react/prop-types */
import React, { useEffect, memo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Box,
  makeStyles,
  useTheme,
  Select,
  Input,
  MenuItem,
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { addDeliveryloc, updateDeliveryLocation } from '../actions';
import {
  fetchDeliveryLocations,
  fetchPincodeByCity,
} from '../../HomePage/actions';
import { selectGlobelStoreByKey } from '../../App/selectors';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(theme => ({
  appWrapperContainer: {
    width: 800,
    margin: '0 auto',
    overflow: 'hidden',
    paddingTop: 40,
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 20,
    },
  },
  formWrapper: {
    marginTop: 20,
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  fullWidthGrid: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    [theme.breakpoints.down('sm')]: {
      gridColumnEnd: '2',
    },
  },
  fullWidthGridBrandTable: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr ',
    gap: 15,
    alignItems: 'flex-end',
    padding: 15,
    border: `1px dashed ${theme.palette.primary.main}`,
  },
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#B69C72',
    margin: '8px 0 5px 0',
  },
  imageItem: {
    marginTop: 10,
    '&:not(:last-child)': {
      marginRight: 10,
    },
    '& img': {
      height: 100,
      borderRadius: 4,
    },
  },
  mobileScroll: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  radioFilter: {
    flexDirection: 'row',
  },
}));

const AddLocationToLocationMaster = ({
  deliveryInLocations,
  fetchDeliveryLocations,
  addDeliveryloc,
  updateDeliveryLocation,
  selectedProduct,
  setEditMode,
  editMode,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState();
  const [deliverySlotTable, setDeliverySlotTable] = useState([
    {
      slot: '',
      // cutoffTime: '',
    },
  ]);

  const [deliverySlotPayload, setDeliverySlotPayload] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [updatedEl, setUpdatedEl] = useState();
  const [state, setState] = useState({
    dispatchFrom: '',
    deliveryTo: '',
    leadTime: '',
    restrictedDeliveryDays: [],
    deliverySlots: [],
    description: '',
    minCartAmount: '',
    minCartAmountRemote: '',
    deliveryCharge: '',
    deliveryChargeRemote: '',
    holidayStartDate: '',
    holidayEndDate: '',
    cutoffTimeDFH: '',
    isIntraCity: 'intercity',
  });
  const {
    dispatchFrom,
    deliveryTo,
    leadTime,
    restrictedDeliveryDays,
    deliverySlots,
    description,
    minCartAmount,
    minCartAmountRemote,
    deliveryCharge,
    deliveryChargeRemote,
    holidayStartDate,
    holidayEndDate,
    cutoffTimeDFH,
    isIntraCity,
  } = state;

  const handleDeliverySlotData = (value, str, n) => {
    const data = (updatedEl && [...updatedEl]) || [];
    data.push(n);
    const unique = new Set(data);
    setUpdatedEl([...unique]);
    if (str) {
      const temp = [...deliverySlotTable];
      if (temp.findIndex(slot => slot.slot === value) < 0)
        temp[n] = { ...temp[n], [str]: value };
      setDeliverySlotTable(temp);
    }
  };

  const handlePriceInfo = idx => {
    if (deliverySlotTable[idx].slot) {
      const temp = [...deliverySlotTable];
      updatePriceInfoPayload(selectedProduct, deliverySlotTable);
      setDeliverySlotTable(temp);
      const removeUpdatedKey = updatedEl.filter(el => el !== idx);
      setUpdatedEl(removeUpdatedKey);
    }
  };
  const addPriceInfo = idx => {
    const temp = [
      ...deliverySlotTable,
      {
        slot: '',
        // cutoffTime: '',
      },
    ];
    updatePriceInfoPayload(selectedProduct, deliverySlotTable);
    setDeliverySlotTable(temp);
  };

  const removeRow = n => {
    const temp = [...deliverySlotTable];
    temp.splice(n, 1);
    // : // : temp.length - 1 === n
    //   // ? (temp[n] = { ...temp[n], isDeleted: false })
    //   (temp[n] = { ...temp[n], isDeleted: true });
    setDeliverySlotTable(temp);
    updatePriceInfoPayload(selectedProduct, temp);
  };

  const updatePriceInfoPayload = (sp, prevData) => {
    const temp = [...prevData]
      .map(data => ({
        slot: data.slot,
        // cutoffTime: data.cutoffTime,
        slotId: !sp ? undefined : data && data._id,
      }))
      .filter(f => {
        if (Object.values(f).every(v => v !== '')) {
          return f;
        }
      });
    setDeliverySlotPayload(temp);
  };

  const handleChange = (val, str) => {
    if (str) {
      // //console.log({ [str]: val }, 'test');
      setState({ ...state, [str]: val });
      let temp = errorMessage;
      if (val) {
        temp = { ...errorMessage, [str]: null };
      }
      setErrorMessage(temp);
    }
  };
  const handleChangemulti = event => {
    const {
      target: { value },
    } = event;
    handleChange(
      typeof value === 'string' ? value.split(',') : value,
      'restrictedDeliveryDays',
    );
  };
  useEffect(() => {
    fetchDeliveryLocations();
  }, []);

  useEffect(() => {
    if (dispatchFrom && deliveryTo)
      handleChange(
        dispatchFrom._id === deliveryTo._id ? 'intracity' : 'intercity',
        'isIntraCity',
      );
  }, [dispatchFrom, deliveryTo, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      setState(selectedProduct);
      setDeliverySlotTable(selectedProduct.deliverySlots);
      updatePriceInfoPayload(selectedProduct, selectedProduct.deliverySlots);
    }
  }, [selectedProduct]);

  useEffect(() => {
    setIsValid(Object.values(state).every(v => v !== '')), [state];
  });

  const onClickHandler = () => {
    if (
      dispatchFrom &&
      deliveryTo &&
      leadTime !== '' &&
      description &&
      deliverySlotPayload &&
      cutoffTimeDFH &&
      restrictedDeliveryDays.length !== 7
    ) {
      const payload = {
        ...(selectedProduct && { ...selectedProduct }),
        dispatchFrom: dispatchFrom._id,
        deliveryTo: deliveryTo._id,
        leadTime,
        restrictedDeliveryDays,
        description,
        deliverySlots: deliverySlotPayload,
        minCartAmount: +minCartAmount,
        minCartAmountRemote: +minCartAmountRemote,
        deliveryCharge: +deliveryCharge,
        deliveryChargeRemote: +deliveryChargeRemote,
        holidayStartDate,
        holidayEndDate,
        cutoffTimeDFH,
        isIntraCity: isIntraCity === 'intracity',
      };
      new Promise((resolve, reject) => {
        if (selectedProduct) {
          updateDeliveryLocation({ resolve, reject, payload });
        } else addDeliveryloc({ resolve, reject, payload });
      })
        .then(res => {
          if (res.data.success) {
            alert(
              selectedProduct ? 'Connection Updated' : 'New Connection Created',
            );
            setEditMode(true);
            setState({
              dispatchFrom: '',
              deliveryTo: '',
              leadTime: '',
              restrictedDeliveryDays: [],
              description: '',
              minCartAmount: '',
              minCartAmountRemote: '',
              deliveryCharge: '',
              deliveryChargeRemote: '',
              holidayStartDate: '',
              holidayEndDate: '',
              cutoffTimeDFH: '',
            });
            setDeliverySlotPayload([]);
            setDeliverySlotTable([
              {
                slot: '',
                // cutoffTime: '',
              },
            ]);
          } else {
            alert(res.data.error);
          }
        })
        .catch(e => {});
    }
  };

  return (
    <AppWrapper>
      <ValidatorForm
        onSubmit={() => onClickHandler()}
        onError={errors => console.log(errors)}
      >
        <Box className={classes.appWrapperContainer}>
          {state && (
            <Box display="grid" className={classes.formWrapper}>
              <div>
                <div className={classes.formHeaders}>Dispatch From</div>
                <Autocomplete
                  options={
                    (deliveryInLocations && deliveryInLocations.items) || []
                  }
                  getOptionLabel={option => option.name}
                  getOptionSelected={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => handleChange(val, 'dispatchFrom')}
                  value={dispatchFrom}
                  size="small"
                  disableClearable
                  renderInput={params => (
                    <TextValidator
                      {...params}
                      variant="outlined"
                      name="dispatchFrom"
                      value={dispatchFrom}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  )}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>Delivery To</div>
                <Autocomplete
                  options={
                    (deliveryInLocations && deliveryInLocations.items) || []
                  }
                  getOptionLabel={option => option.name}
                  getOptionSelected={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => handleChange(val, 'deliveryTo')}
                  value={deliveryTo}
                  size="small"
                  disableClearable
                  renderInput={params => (
                    <TextValidator
                      {...params}
                      variant="outlined"
                      name="deliveryTo"
                      value={deliveryTo}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  )}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>Lead Time</div>
                <TextValidator
                  fullWidth
                  value={leadTime}
                  onChange={e => handleChange(e.target.value, 'leadTime')}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="text"
                  name="Lead Time"
                  placeholder="00"
                  validators={['required', 'matchRegexp:^[0-9]{1,2}$']}
                  errorMessages={[
                    'This field is required',
                    'Lead Time is not valid ',
                  ]}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>Delivery-barred days</div>
                <FormControl>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={restrictedDeliveryDays}
                    onChange={handleChangemulti}
                    input={<Input label="Name" />}
                    MenuProps={MenuProps}
                    error={restrictedDeliveryDays.length === 7}
                  >
                    {[
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ].map((name, i) => (
                      <MenuItem key={name} value={i}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {restrictedDeliveryDays.length === 7 &&
                      'All days cannot be restricted days'}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className={classes.fullWidthGrid}>
                {deliverySlotTable.map((c, n) => (
                  <div
                    style={{
                      display: 'grid',
                      marginBottom: 5,
                    }}
                    className={classes.fullWidthGridBrandTable}
                  >
                    <div>
                      <div className={classes.formHeaders}>Slot</div>
                      <TextValidator
                        name={`Slot - ${n}`}
                        onChange={e =>
                          handleDeliverySlotData(e.target.value, 'slot', n)
                        }
                        value={c.slot}
                        fullWidth
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        validators={[
                          'required',
                          'matchRegexp:^[0-9]{2}-[0-9]{2}$',
                        ]}
                        type="text"
                        placeholder="03-09"
                        errorMessages={[
                          'This field is required',
                          'Slot is not valid eg(03-09)',
                        ]}
                      />
                    </div>
                    {/* <div>
                      <div className={classes.formHeaders}>Cut Off Time</div>
                      <TextValidator
                        name={`Cut Off Time ${n}`}
                        onChange={e =>
                          handleDeliverySlotData(
                            e.target.value,
                            'cutoffTime',
                            n,
                          )
                        }
                        value={c.cutoffTime}
                        fullWidth
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        type="text"
                        placeholder="00"
                        validators={['required', 'matchRegexp:^[0-9]{1,2}$']}
                        errorMessages={[
                          'This field is required',
                          'Cut Off Time is not valid',
                        ]}
                      />
                    </div> */}
                    <div>
                      {updatedEl &&
                        updatedEl.map(
                          el =>
                            el === n && (
                              <Button
                                onClick={() => handlePriceInfo(n)}
                                variant="contained"
                                style={{ color: '#fff' }}
                                color="primary"
                                className={classes.btn}
                              >
                                Save Slot
                              </Button>
                            ),
                        )}
                      {((selectedProduct &&
                        deliverySlotPayload.filter(slot => !slot.isDeleted)
                          .length > 1) ||
                        (!selectedProduct && deliverySlotTable.length > 1)) && (
                        <Button
                          onClick={() => removeRow(n)}
                          variact="outlined"
                          color="primary"
                          className={classes.btn}
                          disabled={deliverySlotTable.length === 1}
                        >
                          Delete Slot
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {deliverySlotTable.length && (
                  <Button
                    onClick={() => addPriceInfo(deliverySlotTable.length + 1)}
                    color="primary"
                    variant="contained"
                    style={{ color: '#fff', width: '100%' }}
                    className={classes.btn}
                  >
                    Add Slot
                  </Button>
                )}
              </div>
              <div>
                <div className={classes.formHeaders}>Description</div>
                <TextValidator
                  fullWidth
                  value={description}
                  onChange={e => handleChange(e.target.value, 'description')}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="text"
                  name="Description"
                  validators={['required', 'matchRegexp:^[a-zA-Z0-9 .,-]{1,}$']}
                  errorMessages={[
                    'This field is required',
                    'Only aphanumeric data allowed along with (.-,)',
                  ]}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>Delivery type</div>
                {/* <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    aria-label="interCity"
                    name="interCity"
                    className={classes.radioFilter}
                    value={
                      selectedProduct
                        ? isIntraCity
                          ? 'intracity'
                          : 'intercity'
                        : isIntraCity
                    }
                    onChange={e => handleChange(e.target.value, 'isIntraCity')}
                  >
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="intercity"
                      control={<Radio color="primary" size="small" />}
                      label="Inter-city"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="intracity"
                      control={<Radio color="primary" size="small" />}
                      label="Intra-city"
                    />
                  </RadioGroup>
                </FormControl> */}
                <TextValidator
                  fullWidth
                  value={isIntraCity}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  disabled
                />
              </div>
              <div>
                <div className={classes.formHeaders}>
                  Min Cart Amount Normal
                </div>
                <TextValidator
                  fullWidth
                  value={minCartAmount}
                  onChange={e => handleChange(e.target.value, 'minCartAmount')}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="tel"
                  name="Min Cart Amount Normal"
                  validators={['matchRegexp:^[0-9]{1,6}$']}
                  errorMessages={['Min Cart Amount Normal is not valid']}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>
                  Min Cart Amount Remote
                </div>
                <TextValidator
                  fullWidth
                  value={minCartAmountRemote}
                  onChange={e =>
                    handleChange(e.target.value, 'minCartAmountRemote')
                  }
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="tel"
                  name=" Min Cart Amount Remote"
                  validators={['matchRegexp:^[0-9]{1,6}$']}
                  errorMessages={['Min Cart Amount Remote is not valid']}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>
                  Delivery Charge Normal
                </div>
                <TextValidator
                  fullWidth
                  value={deliveryCharge}
                  onChange={e => handleChange(e.target.value, 'deliveryCharge')}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="tel"
                  name="Delivery Charge Normal"
                  validators={['matchRegexp:^[0-9]{1,6}$']}
                  errorMessages={['Delivery Charge Normal is not valid']}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>
                  Delivery Charge Remote
                </div>
                <TextValidator
                  fullWidth
                  value={deliveryChargeRemote}
                  onChange={e =>
                    handleChange(e.target.value, 'deliveryChargeRemote')
                  }
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="tel"
                  name="Delivery Charge Remote"
                  validators={['matchRegexp:^[0-9]{1,6}$']}
                  errorMessages={['Delivery Charge Remote is not valid']}
                />
              </div>
              <div>
                <div className={classes.formHeaders}>Holiday Start Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="holidayStartDate"
                    disablePast={!selectedProduct}
                    value={holidayStartDate ? moment(holidayStartDate) : null}
                    renderInput={props => (
                      <TextValidator {...props} name="holidayStartDate" />
                    )}
                    onChange={date => handleChange(date, 'holidayStartDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <div className={classes.formHeaders}>Holiday End Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="holidayEndDate"
                    disablePast={!selectedProduct}
                    minDate={new Date(holidayStartDate)}
                    value={holidayEndDate ? moment(holidayEndDate) : null}
                    renderInput={props => (
                      <TextValidator {...props} name="holidayEndDate" />
                    )}
                    onChange={date => handleChange(date, 'holidayEndDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <div className={classes.formHeaders}>Cut off Time DFH</div>
                <TextValidator
                  value={cutoffTimeDFH}
                  onChange={e => handleChange(e.target.value, 'cutoffTimeDFH')}
                  id="cutoffTimeDFH"
                  fullWidth
                  autoComplete="none"
                  size="small"
                  variant="outlined"
                  name="cutoffTimeDFH"
                  type="text"
                  placeholder="00"
                  validators={['required', 'matchRegexp:^[0-9]{1,2}$']}
                  errorMessages={[
                    'This field is required',
                    'Cut off Time DFH is not valid',
                  ]}
                />
              </div>
            </Box>
          )}
          <Box mt="20px">
            <Button
              variant="contained"
              color="primary"
              style={{ color: '#fff' }}
              type="submit"
            >
              Submit Data
            </Button>
          </Box>
        </Box>
      </ValidatorForm>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryLocations,
      addDeliveryloc,
      fetchPincodeByCity,
      updateDeliveryLocation,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(AddLocationToLocationMaster);
