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
  FormHelperText,
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import moment from 'moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { uploadFile } from 'react-s3';
import { addBrand, updateBrand } from '../actions';
import {
  fetchDeliveryLocations,
  fetchPincodeByCity,
} from '../../HomePage/actions';
import { getMetaList } from '../../MetaMaster/actions';
import { selectGlobelStoreByKey } from '../../App/selectors';
import { selectMetaMasterStoreByKey } from '../../MetaMaster/selectors';
import { selectBrandMasterStoreByKey } from '../selectors';
import { config } from '../../../awsconfig';
const filter = createFilterOptions();
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
const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

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
}));

const AddBrandMaster = ({
  deliveryInLocations,
  deliveryInPincode,
  fetchDeliveryLocations,
  addBrand,
  updateBrand,
  fetchPincodeByCity,
  selectedProduct,
  setEditMode,
  getMetaList,
  metaList,
  brandList,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [images, setImages] = useState();
  // const [updatedState, setUpdatedState] = useState();
  const [validBrandName, setValidBrandName] = useState(null);
  const [validBrandNameOptions, setValidBrandNameOptions] = useState(null);
  const [pickupSlotTable, setPickupSlotTable] = useState([
    {
      slot: '',
      cutoffTime: '',
    },
  ]);
  const [pickupSlotPayload, setPickupSlotPayload] = useState([]);
  const [updatedEl, setUpdatedEl] = useState();
  const [dataUrls, setDataUrls] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const maxNumber = 3;
  const onChange = imageList => {
    //console.log(imageList);
    setImages(imageList);
  };

  const [state, setState] = useState({
    brandName: '',
    brandShortDescription: '',
    brandLongDescription: '',
    brandHistory: '',
    brandAddress: '',
    brandCode: '',
    brandCity: '',
    brandImages: [],
    commencementDate: moment(),
    brandMobileNumber: '',
    brandContactName: '',
    brandPincode: '',
    metadata: '',
    pickupSlots: [],
    holidayStartDate: '',
    holidayEndDate: '',
    priority: '',
  });
  const {
    brandShortDescription,
    brandLongDescription,
    brandHistory,
    brandAddress,
    brandCity,
    brandCode,
    commencementDate,
    brandMobileNumber,
    brandContactName,
    brandPincode,
    metadata,
    holidayStartDate,
    holidayEndDate,
    priority,
  } = state;
  const handlePickupSlotData = (value, str, n) => {
    const data = (updatedEl && [...updatedEl]) || [];
    data.push(n);
    const unique = new Set(data);
    setUpdatedEl([...unique]);
    if (str) {
      const temp = [...pickupSlotTable];
      temp[n] = { ...temp[n], [str]: value };
      setPickupSlotTable(temp);
    }
  };

  const handlePriceInfo = idx => {
    if (pickupSlotTable[idx].slot && pickupSlotTable[idx].cutoffTime) {
      const temp = [...pickupSlotTable];
      updatePriceInfoPayload(selectedProduct, pickupSlotTable);
      setPickupSlotTable(temp);
      const removeUpdatedKey = updatedEl.filter(el => el !== idx);
      setUpdatedEl(removeUpdatedKey);
    }
  };
  const addPriceInfo = idx => {
    const temp = [
      ...pickupSlotTable,
      {
        slot: '',
        cutoffTime: '',
      },
    ];
    updatePriceInfoPayload(selectedProduct, pickupSlotTable);
    setPickupSlotTable(temp);
  };

  const removeRow = n => {
    const temp = [...pickupSlotTable];
    temp.splice(n, 1);
    // : // : temp.length - 1 === n
    //   // ? (temp[n] = { ...temp[n], isDeleted: false })
    //   (temp[n] = { ...temp[n], isDeleted: true });
    setPickupSlotTable(temp);
    updatePriceInfoPayload(selectedProduct, temp);
  };

  const updatePriceInfoPayload = (sp, prevData) => {
    const temp = [...prevData]
      .map(data => ({
        slot: data.slot,
        cutoffTime: data.cutoffTime,
        slotId: !sp ? undefined : data && data._id,
      }))
      .filter(f => {
        if (Object.values(f).every(v => v !== '')) {
          return f;
        }
      });
    setPickupSlotPayload(temp);
  };

  const handleChange = (val, str) => {
    if (str) {
      let temp = errorMessage;
      if (val) {
        temp = { ...errorMessage, [str]: null };
      }
      if (str === 'brandCity' && val._id) {
        setState({ ...state, [str]: val, brandPincode: null });
        // fetchPincodeByCity(val);
      } else setState({ ...state, [str]: val });

      setErrorMessage(temp);
    }
  };

  useEffect(() => {
    fetchDeliveryLocations();
    getMetaList();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const cst = {
        ...selectedProduct,
        metadata: selectedProduct.metadata.map(m => m.metaId),
      };
      // fetchPincodeByCity(cst.brandCity);
      setImages(cst.brandImages);
      setState(cst);
      setValidBrandName({ title: selectedProduct.brandName });
      selectedProduct.pickupSlots &&
        selectedProduct.pickupSlots.length > 0 &&
        setPickupSlotTable(selectedProduct.pickupSlots);
      updatePriceInfoPayload(selectedProduct, selectedProduct.pickupSlots);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (brandList) {
      const validBrandNameData = new Set(brandList.map(m => m.brandName));
      // const validBrandCodeData = new Set(brandList.map(m => m.brandCode));
      setValidBrandNameOptions(
        [...validBrandNameData].map(d => ({ title: d })),
      );
    }
  }, [brandList]);

  const onClickHandler = () => {
    let s3Images = [];
    if (!images || !images.length > 0) alert('please add images');
    else {
      const promises = images
        .filter(image => image.file)
        .map(image =>
          uploadFile(image.file, config).then(d => {
            s3Images = [...s3Images, d.location];
          }),
        );
      Promise.all(promises)
        .then(() => {
          if (
            validBrandName &&
            brandLongDescription &&
            brandAddress &&
            brandCity &&
            brandPincode &&
            priority
          ) {
            const payload = {
              ...(selectedProduct && {
                ...selectedProduct,
              }),
              brandName: validBrandName.title.trim(),
              brandShortDescription,
              brandLongDescription,
              brandHistory,
              brandAddress,
              brandCode,
              brandCity: brandCity._id,
              brandImages: [
                ...images.filter(image => !image.file),
                ...s3Images,
              ],
              priority,
              commencementDate,
              brandMobileNumber,
              brandContactName,
              brandPincode,
              metadata,
              pickupSlots: pickupSlotPayload,
              holidayStartDate,
              holidayEndDate,
            };
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateBrand({ resolve, reject, payload });
              } else addBrand({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(
                    selectedProduct
                      ? 'Restaurent Updated'
                      : 'Restaurent Created',
                  );
                  setEditMode(true);
                  setState({
                    brandName: '',
                    brandShortDescription: '',
                    brandLongDescription: '',
                    brandHistory: '',
                    brandAddress: '',
                    brandCode: '',
                    brandCity: '',
                    brandPincode: '',
                    brandImages: [],
                    commencementDate: '',
                    brandMobileNumber: '',
                    brandContactName: '',
                    metadata: '',
                    holidayStartDate: '',
                    holidayEndDate: '',
                    priority: '',
                  });
                  setDataUrls();
                  setPickupSlotPayload([]);
                  setPickupSlotTable([
                    {
                      slot: '',
                      cutoffTime: '',
                    },
                  ]);
                } else {
                  alert(res.data.error);
                }
              })
              .catch(e => {});
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <AppWrapper>
      <Box className={classes.appWrapperContainer}>
        <ValidatorForm
          onSubmit={() => onClickHandler()}
          onError={errors => console.log(errors)}
        >
          <Box>
            <div>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={isDragging ? { color: 'red' } : null}
                      onClick={() => onImageUpload()}
                      {...dragProps}
                      disabled={images && images.length === 3}
                    >
                      Add Images
                    </Button>
                    <Box display="flex" className={classes.mobileScroll}>
                      {imageList.map((image, index) => (
                        <div key={index} className={classes.imageItem}>
                          <img
                            src={image && (image.data_url || image)}
                            alt=""
                            width="100"
                          />
                          <Box
                            align="center"
                            mt="5px"
                            className="image-item__btn-wrapper"
                          >
                            <Button
                              onClick={() => onImageRemove(index)}
                              size="small"
                              variant="outlined"
                              color="primary"
                              style={{ padding: 0, fontSize: 10 }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </div>
                      ))}
                    </Box>
                  </div>
                )}
              </ImageUploading>
            </div>
            {state && (
              <Box display="grid" className={classes.formWrapper}>
                <div>
                  <div className={classes.formHeaders}>Brand Code *</div>
                  <TextValidator
                    name="Brand Code"
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    value={brandCode}
                    disabled
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Brand Name *</div>
                  <Autocomplete
                    fullWidth
                    value={validBrandName}
                    getOptionDisabled={option => !option.inputValue}
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'string') {
                        setValidBrandName({
                          title: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        setValidBrandName({
                          title: newValue.inputValue,
                        });
                      } else {
                        setValidBrandName(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== '' && filtered.length === 0) {
                        filtered.push({
                          inputValue: params.inputValue,
                          title: `Add "${params.inputValue}"`,
                        });
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={validBrandNameOptions}
                    getOptionLabel={option => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.title;
                    }}
                    getOptionSelected={option =>
                      option &&
                      validBrandName &&
                      option.title &&
                      validBrandName.title &&
                      option.title === validBrandName.title
                    }
                    renderOption={option => option.title}
                    freeSolo
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        name="Brand Name"
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        value={validBrandName}
                      />
                    )}
                  />
                </div>
                <div className={classes.fullWidthGrid}>
                  {pickupSlotTable.map((c, n) => (
                    <div
                      style={{
                        display: 'grid',
                        marginBottom: 5,
                      }}
                      className={classes.fullWidthGridBrandTable}
                    >
                      <div>
                        <div className={classes.formHeaders}>PickUp Time</div>
                        <TextValidator
                          name={`Slot - ${n}`}
                          onChange={e =>
                            handlePickupSlotData(e.target.value, 'slot', n)
                          }
                          value={c.slot}
                          fullWidth
                          autoComplete="none"
                          size="small"
                          variant="outlined"
                          validators={['matchRegexp:^[0-9]{2}-[0-9]{2}$']}
                          type="text"
                          placeholder="03-09"
                          errorMessages={['PickUp Time is not valid eg(03)']}
                        />
                      </div>
                      <div>
                        <div className={classes.formHeaders}>Cut Off Time</div>
                        <TextValidator
                          name={`Cut Off Time ${n}`}
                          onChange={e =>
                            handlePickupSlotData(
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
                          validators={['matchRegexp:^[0-9]{1,2}$']}
                          errorMessages={['Cut Off Time is not valid']}
                        />
                      </div>
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
                          pickupSlotPayload.filter(slot => !slot.isDeleted)
                            .length > 1) ||
                          (!selectedProduct && pickupSlotTable.length > 1)) && (
                          <Button
                            onClick={() => removeRow(n)}
                            variact="outlined"
                            color="primary"
                            className={classes.btn}
                            disabled={pickupSlotTable.length === 1}
                          >
                            Delete Slot
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {pickupSlotTable.length && (
                    <Button
                      onClick={() => addPriceInfo(pickupSlotTable.length + 1)}
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
                  <div className={classes.formHeaders}>
                    Brand Short Description
                  </div>

                  <TextValidator
                    name="Brand Short Description"
                    onChange={e =>
                      handleChange(e.target.value, 'brandShortDescription')
                    }
                    value={brandShortDescription}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>
                    Brand Long Description
                  </div>
                  <TextValidator
                    name="Brand Long Description"
                    onChange={e =>
                      handleChange(e.target.value, 'brandLongDescription')
                    }
                    value={brandLongDescription}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Brand History</div>
                  <TextValidator
                    name="Brand History"
                    onChange={e => handleChange(e.target.value, 'brandHistory')}
                    value={brandHistory}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Brand Address *</div>
                  <TextValidator
                    name="Brand Address"
                    onChange={e => handleChange(e.target.value, 'brandAddress')}
                    value={brandAddress}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Brand City *</div>
                  <Autocomplete
                    options={
                      (deliveryInLocations && deliveryInLocations.items) || []
                    }
                    getOptionLabel={option => option.name}
                    getOptionSelected={(option, value) =>
                      option &&
                      option._id &&
                      value &&
                      value._id &&
                      option._id === value._id
                    }
                    onChange={(e, val) => handleChange(val, 'brandCity')}
                    value={brandCity}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    disableClearable
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        name="Brand City"
                        value={brandCity}
                      />
                    )}
                  />
                  {errorMessage && errorMessage.brandCity && (
                    <div className={classes.error}>
                      {errorMessage.brandCity}
                    </div>
                  )}
                </div>
                <div>
                  <div className={classes.formHeaders}>Pincode *</div>
                  {/* <Autocomplete
                    options={
                      (deliveryInPincode && deliveryInPincode) || []
                    }
                    getOptionLabel={option => option.pin}
                    getOptionSelected={(option, value) => {
                      return (
                        `${option._id}` === value && value._id && value._id
                      );
                    }}
                    value={brandPincode}
                    size="small"
                    disableClearable
                    renderInput={params => ( */}
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    autoComplete="none"
                    size="small"
                    name="Pincode"
                    onChange={e => handleChange(e.target.value, 'brandPincode')}
                    value={brandPincode}
                    validators={[
                      'required',
                      'matchRegexp:^[1-9]{1}[0-9]{2}[0-9]{3}$',
                    ]}
                    type="tel"
                    errorMessages={[
                      'This field is required',
                      'Pin is not valid',
                    ]}
                    inputProps={{
                      maxLength: 6,
                    }}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Priority</div>
                  <TextValidator
                    name="Priority"
                    onChange={e => handleChange(e.target.value, 'priority')}
                    value={priority}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={['required', 'matchRegexp:^[1-9]{1}$']}
                    errorMessages={[
                      'This field is required',
                      'Priority is not valid',
                    ]}
                    inputProps={{
                      maxLength: 1,
                    }}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Contact Name </div>
                  <TextValidator
                    fullWidth
                    name="Contact Name"
                    value={brandContactName}
                    onChange={e =>
                      handleChange(e.target.value, 'brandContactName')
                    }
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    validators={['matchRegexp:^[a-zA-Z\\s]{1,}$']}
                    errorMessages={['Name  is not valid']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Mobile Number </div>
                  <TextValidator
                    fullWidth
                    value={brandMobileNumber}
                    onChange={e =>
                      handleChange(e.target.value, 'brandMobileNumber')
                    }
                    name="Mobile Number"
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    type="tel"
                    validators={['matchRegexp:^[0-9]{10}$']}
                    errorMessages={[
                      // 'This field is required',
                      'Mobile Number is not valid',
                    ]}
                    inputProps={{
                      maxLength: 10,
                    }}
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
                  <div className={classes.formHeaders}>Commencement Date *</div>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk
                      variant="inline"
                      format="DD/MM/yyyy"
                      margin="normal"
                      id="commencementDate"
                      disablePast={!selectedProduct}
                      value={commencementDate && moment(commencementDate)}
                      renderInput={props => (
                        <TextValidator
                          {...props}
                          name="commencementDate"
                          // validators={['required']}
                          // errorMessages={['This field is required']}
                          value={commencementDate && moment(commencementDate)}
                        />
                      )}
                      onChange={date => handleChange(date, 'commencementDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <div className={classes.formHeaders}>Select Meta Data</div>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={metadata || []}
                    onChange={e => handleChange(e.target.value, 'metadata')}
                    input={<Input label="Name" />}
                    MenuProps={MenuProps}
                    // error={metadata.length === 0}
                  >
                    {metaList &&
                      metaList.map(meta => (
                        <MenuItem key={meta.name} value={meta._id}>
                          {meta.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {/* {
                    <FormHelperText error>
                      {metadata.length === 0 && 'Please Select Meta Data'}
                    </FormHelperText>
                  } */}
                </div>
              </Box>
            )}
          </Box>
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
        </ValidatorForm>
      </Box>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  // deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  metaList: selectMetaMasterStoreByKey('metaList'),
  brandList: selectBrandMasterStoreByKey('brandList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryLocations,
      addBrand,
      updateBrand,
      fetchPincodeByCity,
      getMetaList,
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
)(AddBrandMaster);
