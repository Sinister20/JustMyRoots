import React, { useEffect, memo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Box,
  makeStyles,
  TextField,
  useTheme,
  Select,
  Input,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { uploadFile } from 'react-s3';
import { addLocation, updateLocation, getLocationListById } from '../actions';
import {
  fetchDeliveryStates,
  fetchPincodeByCity,
} from '../../HomePage/actions';
import { selectGlobelStoreByKey } from '../../App/selectors';
import { selectLocationMasterStoreByKey } from '../selectors';
import { config } from '../../../awsconfig';
import { ContactSupportOutlined } from '@material-ui/icons';
import { lowerFirst } from 'lodash';

const filter = createFilterOptions();

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
}));

const AddLocationToLocationMaster = ({
  deliveryInStates,
  fetchDeliveryStates,
  addLocation,
  selectedProduct,
  setEditMode,
  updateLocation,
  getLocationListById,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [images, setImages] = useState();
  const [dataUrls, setDataUrls] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [locationList, setLocationList] = useState([]);
  const [validName, setValidName] = useState(null);
  const [validNameOptions, setValidNameOptions] = useState([]);
  const [pickupSlotTable, setPickupSlotTable] = useState([
    {
      slot: '',
      cutoffTime: '',
    },
  ]);
  const [pickupSlotPayload, setPickupSlotPayload] = useState([]);
  const [updatedEl, setUpdatedEl] = useState();

  const onChange = imageList => {
    setImages(imageList);
  };

  const [data, setData] = useState({
    name: '',
    locationCode: '',
    gstCode: '',
    contactNumber: '',
    email: '',
    address: '',
    coveredPincodes: '',
    restrictedPincodes: '',
    descriptionShort: '',
    descriptionLong: '',
    state: '',
    pincode: '',
    imageUrls: '',
    pickupSlots: [],
  });
  const {
    name,
    locationCode,
    gstCode,
    contactNumber,
    email,
    address,
    coveredPincodes,
    restrictedPincodes,
    descriptionShort,
    descriptionLong,
    state,
    pincode,
    imageUrls,
  } = data;

  const errorPayload = {
    state: null,
  };
  const handlePickupSlotData = (value, str, n) => {
    const dataSet = (updatedEl && [...updatedEl]) || [];
    dataSet.push(n);
    const unique = new Set(dataSet);
    setUpdatedEl([...unique]);
    if (str) {
      const temp = [...pickupSlotTable];
      temp[n] = { ...temp[n], [str]: value };
      setPickupSlotTable(temp);
    }
  };
  const [commonPincodes, setCommonPincodes] = useState([]);
  const [errorPincodes, setErrorPincodes] = useState();
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
      .map(d => ({
        slot: d.slot,
        cutoffTime: d.cutoffTime,
        slotId: !sp ? undefined : d && d._id,
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
      setData({ ...data, [str]: val });
      let temp = errorMessage;
      if (val) {
        temp = { ...errorMessage, [str]: null };
      }
      setErrorMessage(temp);
    }
  };

  useEffect(() => {
    fetchDeliveryStates();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setImages(selectedProduct.imageUrls);
      setData(selectedProduct);
      setValidName({ title: selectedProduct.name });
      selectedProduct.pickupSlots &&
        selectedProduct.pickupSlots.length > 0 &&
        setPickupSlotTable(selectedProduct.pickupSlots);
      updatePriceInfoPayload(selectedProduct, selectedProduct.pickupSlots);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (state) {
      new Promise((resolve, reject) => {
        const selectedState =
          (selectedProduct &&
            selectedProduct.state &&
            deliveryInStates.items.filter(
              b => b._id && b._id === state._id,
            )[0]) ||
          state;
        getLocationListById({ selectedState, resolve, reject });
      }).then(d => {
        setLocationList(d);
      });
    } else {
      setLocationList([]);
    }
  }, [state]);

  useEffect(() => {
    if (locationList && locationList.length > 0) {
      const validNameData = new Set(locationList.map(m => m.name));
      setValidNameOptions([...validNameData].map(d => ({ title: d })));
    }
  }, [locationList]);

  useEffect(() => {
    ValidatorForm.addValidationRule('requiredState', () => state !== '');
  }, [state]);

  // useEffect(() => {
  //   ValidatorForm.addValidationRule('requiredCoveredPincodes', () => {
  //     const testData = Array.isArray(coveredPincodes)
  //       ? coveredPincodes
  //       : coveredPincodes.split(',');

  //     return testData.length > 0 && testData.every(e => e.length === 6);
  //   });
  // }, [coveredPincodes]);

  useEffect(() => {
    let c = [];
    const a = Array.isArray(restrictedPincodes)
      ? restrictedPincodes
          .join()
          .replaceAll(' ', '')
          .split(',')
      : restrictedPincodes.replaceAll(' ', '').split(',');
    const b = Array.isArray(coveredPincodes)
      ? coveredPincodes
          .join()
          .replaceAll(' ', '')
          .split(',')
      : coveredPincodes.replaceAll(' ', '').split(',');
    if (a) {
      a.map(ac => {
        if (ac !== '' && b.includes(ac)) {
          c = [...c, ac];
        }
      });
    }

    setErrorPincodes({
      ...errorPincodes,
      restrictedPincodes:
        Array.isArray(a) &&
        a.filter(test => test.length > 0 && test.length !== 6),
      coveredPincodes:
        Array.isArray(b) &&
        b.filter(test => test.length > 0 && test.length !== 6),
    });
    setCommonPincodes(c);
  }, [restrictedPincodes, coveredPincodes]);

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
            validName &&
            locationCode &&
            gstCode &&
            contactNumber &&
            coveredPincodes &&
            descriptionShort &&
            descriptionLong &&
            state &&
            pincode &&
            email &&
            address &&
            pickupSlotPayload
          ) {
            const payload = {
              ...(selectedProduct && {
                ...selectedProduct,
              }),
              name: validName.title,
              locationCode,
              gstCode,
              contactNumber,
              coveredPincodes: Array.isArray(coveredPincodes)
                ? coveredPincodes
                : coveredPincodes.split(','),
              restrictedPincodes: Array.isArray(restrictedPincodes)
                ? restrictedPincodes
                : restrictedPincodes.split(','),
              descriptionShort,
              descriptionLong,
              state: state._id,
              pincode,
              email,
              address,
              imageUrls: [...images.filter(image => !image.file), ...s3Images],
              pickupSlots: pickupSlotPayload,
            };
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateLocation({ resolve, reject, payload });
              } else addLocation({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(
                    selectedProduct
                      ? 'Delivery Location Updated'
                      : 'Delivery Location Created',
                  );
                  setEditMode(true);
                  setData({
                    validName: '',
                    locationCode: '',
                    gstCode: '',
                    contactNumber: '',
                    coveredPincodes: '',
                    restrictedPincodes: '',
                    descriptionShort: '',
                    descriptionLong: '',
                    state: '',
                    pincode: '',
                    imageUrls: '',
                    email: '',
                    address: '',
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
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={3}
            dataURLKey="data_url"
            multiple
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
                        src={(image && image.data_url) || image}
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
          <Box display="grid" className={classes.formWrapper}>
            <div>
              <div className={classes.formHeaders}>State</div>
              <Autocomplete
                options={(deliveryInStates && deliveryInStates.items) || []}
                getOptionLabel={option => option.name}
                getOptionSelected={(option, value) => option._id === value._id}
                onChange={(e, val) => handleChange(val, 'state')}
                value={state}
                size="small"
                disableClearable
                renderInput={params => (
                  <TextValidator
                    {...params}
                    name="State"
                    variant="outlined"
                    validators={['requiredState']}
                    errorMessages={['This field is required']}
                  />
                )}
              />
              {errorMessage && errorMessage.state && (
                <div className={classes.error}>{errorMessage.state}</div>
              )}
            </div>
            <div>
              <div className={classes.formHeaders}>Location Name</div>
              <Autocomplete
                disabled={!state}
                value={validName}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setValidName({
                      title: newValue.trim(),
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValidName({
                      title: newValue.inputValue.trim(),
                    });
                  } else {
                    setValidName(newValue.trim());
                  }
                }}
                filterOptions={(options, params) => {
                  const paramss = {
                    ...params,
                    inputValue: params.inputValue.trim(),
                  };
                  const filtered = filter(options, paramss);
                  // Suggest the creation of a new value
                  if (params.inputValue !== '' && filtered.length === 0) {
                    filtered.push({
                      inputValue: params.inputValue.trim(),
                      title: `Add "${params.inputValue.trim()}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={validNameOptions}
                getOptionLabel={option => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue.trim();
                  }
                  // Regular option
                  return option.title;
                }}
                getOptionDisabled={option => !option.inputValue}
                getOptionSelected={option => option.title === validName.title}
                renderOption={option => option.title}
                style={{ width: 300 }}
                freeSolo
                renderInput={params => (
                  <TextValidator
                    {...params}
                    name="Location Name"
                    fullWidth
                    value={validName}
                    size="small"
                    variant="outlined"
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                )}
              />

              {validName && validName.title && (
                <FormHelperText error>
                  {!/^[a-zA-Z ]{3,}$/.test(validName.title) &&
                    'Enter a valid location name'}
                </FormHelperText>
              )}
            </div>
            <div>
              <div className={classes.formHeaders}>Pincode</div>
              <TextValidator
                name="Pincode"
                fullWidth
                value={pincode}
                onChange={e => handleChange(e.target.value, 'pincode')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="tel"
                validators={[
                  'required',
                  'matchRegexp:^[1-9]{1}[0-9]{2}[0-9]{3}$',
                ]}
                errorMessages={['This field is required', 'Pin is not valid']}
                inputProps={{
                  maxLength: 6,
                }}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Location code</div>
              <TextValidator
                name="Location code"
                fullWidth
                value={locationCode}
                onChange={e => handleChange(e.target.value, 'locationCode')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                validators={['required']}
                errorMessages={['This field is required']}
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
                    <div className={classes.formHeaders}>Slot</div>
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
                      validators={[
                        'required',
                        'matchRegexp:^[0-9]{2}-[0-9]{2}$',
                      ]}
                      type="text"
                      placeholder="03-09"
                      errorMessages={[
                        'This field is required',
                        'Slot is not valid eg(03)',
                      ]}
                    />
                  </div>
                  <div>
                    <div className={classes.formHeaders}>Cut Off Time</div>
                    <TextValidator
                      name={`Cut Off Time ${n}`}
                      onChange={e =>
                        handlePickupSlotData(e.target.value, 'cutoffTime', n)
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
                      pickupSlotPayload.filter(slot => !slot.isDeleted).length >
                        1) ||
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
              <div className={classes.formHeaders}>GST Code</div>
              <TextValidator
                name="GST Code"
                fullWidth
                value={gstCode}
                onChange={e => handleChange(e.target.value, 'gstCode')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                validators={[
                  'required',
                  'matchRegexp:^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$',
                ]}
                errorMessages={[
                  'This field is required',
                  'GST number is invalid',
                ]}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Address</div>
              <TextValidator
                name="Address"
                fullWidth
                value={address}
                onChange={e => handleChange(e.target.value, 'address')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="address"
                validators={['required']}
                multiline
                rows={3}
                errorMessages={['This field is required']}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Contact Number</div>
              <TextValidator
                name="Contact Number"
                fullWidth
                value={contactNumber}
                onChange={e => handleChange(e.target.value, 'contactNumber')}
                size="small"
                variant="outlined"
                autoComplete="none"
                validators={['required', 'matchRegexp:^[0-9]{10}$']}
                errorMessages={[
                  'This field is required',
                  'Contact Number is not valid',
                ]}
                type="tel"
                inputProps={{
                  minLength: 10,
                  maxLength: 12,
                }}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Email</div>
              <TextValidator
                name="Email"
                fullWidth
                value={email}
                onChange={e => handleChange(e.target.value, 'email')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="email"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Covered Pincodes</div>
              <TextValidator
                name="Covered Pincodes"
                fullWidth
                value={coveredPincodes}
                onChange={e => handleChange(e.target.value, 'coveredPincodes')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                multiline
                rows={3}
                validators={['required', 'matchRegexp:^[0-9,]{6,}$']}
                errorMessages={[
                  'This Field is required',
                  'Covered Pincodes is not valid',
                ]}
              />
              {errorPincodes &&
                errorPincodes.coveredPincodes &&
                errorPincodes.coveredPincodes.length > 0 && (
                  <FormHelperText error>
                    {`"${errorPincodes.coveredPincodes &&
                      errorPincodes.coveredPincodes.join()}" is not valid`}
                  </FormHelperText>
                )}
            </div>
            <div>
              <div className={classes.formHeaders}>Restricted Pincodes</div>
              <TextValidator
                name="Restricted Pincodes"
                fullWidth
                value={restrictedPincodes}
                onChange={e =>
                  handleChange(e.target.value, 'restrictedPincodes')
                }
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                multiline
                rows={3}
                validators={['matchRegexp:^[0-9,]{6,}$']}
                errorMessages={['Restricted Pincodes is not valid']}
                error={commonPincodes.length > 0}
              />
              {commonPincodes.length > 0 && (
                <FormHelperText error>
                  {`${commonPincodes} are also present in covered pincodes`}
                </FormHelperText>
              )}
              {errorPincodes &&
                errorPincodes.restrictedPincodes &&
                errorPincodes.restrictedPincodes.length > 0 && (
                  <FormHelperText error>
                    {`"${errorPincodes.restrictedPincodes &&
                      errorPincodes.restrictedPincodes.join()}" is not valid`}
                  </FormHelperText>
                )}
            </div>
            <div>
              <div className={classes.formHeaders}>Description Short</div>
              <TextValidator
                name="Description Short"
                fullWidth
                value={descriptionShort}
                onChange={e => handleChange(e.target.value, 'descriptionShort')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                multiline
                rows={3}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Description Long</div>
              <TextValidator
                name="Description Long"
                fullWidth
                value={descriptionLong}
                onChange={e => handleChange(e.target.value, 'descriptionLong')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                multiline
                rows={3}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </div>
          </Box>
          <Box mt="20px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ color: '#fff' }}
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
  deliveryInStates: selectGlobelStoreByKey('deliveryInStates'),
  locationList: selectLocationMasterStoreByKey('locationList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryStates,
      addLocation,
      updateLocation,
      fetchPincodeByCity,
      getLocationListById,
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
