import React, { useEffect, memo, useState, Fragment } from 'react';
import styled from 'styled-components';
import {
  Button,
  Box,
  makeStyles,
  useTheme,
  Select,
  MenuItem,
  FormHelperText,
  Input,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import ImageUploading from 'react-images-uploading';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import moment from 'moment';
import { uploadFile } from 'react-s3';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { selectCouponMasterStoreByKey } from '../selectors';
import { addCoupon, updateCoupon, getCouponList } from '../actions';
import { getBrandList } from '../../BrandMaster/actions';
import { getProductListById } from '../../ProductMaster/actions';
import { getLocationList } from '../../LocationMaster/actions';
import { getUserList } from '../../HomePage/actions';
import { selectBrandMasterStoreByKey } from '../../BrandMaster/selectors';
import { selectLocationMasterStoreByKey } from '../../LocationMaster/selectors';
import { selectGlobelStoreByKey } from '../../App/selectors';
import { config } from '../../../awsconfig';

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

const AddCoupon = ({
  addCoupon,
  selectedProduct,
  setSelectedProduct,
  setEditMode,
  updateCoupon,
  getCouponList,
  couponList,
  editMode,
  getBrandList,
  brandList,
  getProductListById,
  getLocationList,
  cityList,
  getUserList,
  userList,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [validCode, setValidCode] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [validCodeOptions, setValidCodeOptions] = useState();
  const [data, setData] = useState({
    code: '',
    couponType: '',
    brands: [],
    customers: [],
    cities: [],
    items: [],
    discount: '',
    discountType: 0,
    totalCount: '',
    // metaId: '',
    startDate: moment().format(),
    endDate: moment()
      .add(1, 'day')
      .format(),
    isOneTime: false,
    couponTitle: '',
    couponDescription: '',
  });
  const [images, setImages] = useState();
  const [dataUrls, setDataUrls] = useState();
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const [selBrand, setSelBrand] = useState('');
  const [itemList, setItemList] = useState([]);

  const {
    code,
    couponType,
    brands,
    items,
    customers,
    cities,
    discount,
    discountType,
    totalCount,
    // metaId,
    startDate,
    endDate,
    isOneTime,
    couponTitle,
    couponDescription,
  } = data;

  const errorPayload = {
    name: null,
    description: null,
    type: null,
    taxInfo: null,
  };

  useEffect(() => {
    if (selBrand) {
      const selectedBrand =
        brandList && brandList.filter(b => b._id && b._id === selBrand)[0];
      new Promise((resolve, reject) => {
        getProductListById({ selectedBrand, resolve, reject });
      }).then(res => {
        setItemList(res);
      });
    } else {
      setItemList([]);
    }
  }, [selBrand]);

  useEffect(() => {
    //console.log(couponType, 'couponType');
    switch (couponType) {
      case 'brand':
        getBrandList();
        break;
      case 'city':
        getLocationList();
        break;

      case 'item':
        getBrandList();
        break;

      case 'customer':
        getUserList();
        break;
      default:
        //console.log(couponType);
    }
  }, [couponType]);

  useEffect(() => {
    if (selectedProduct) {
      setData({
        ...selectedProduct,
      });
      setValidCode(selectedProduct.code);
      setImages([selectedProduct.logo]);
    }
  }, [selectedProduct]);

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
  const handleChangeDiscount = event => {
    const {
      target: { value },
    } = event;
    handleChange(value, 'discountType');
  };
  useEffect(() => {
    getCouponList();
  }, [editMode]);

  useEffect(() => {
    if (couponList) {
      const couponDataa = new Set(
        couponList.filter(m => !!m.code).map(m => m.code.toLowerCase()),
      );
      setValidCodeOptions([...couponDataa].map(d => ({ title: d })));
    }
  }, [couponList]);

  const onClickHandler = () => {
    let s3Images = [];
    setErrorMessage(errorPayload);
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
          if (validCode) {
            const payload = {
              ...(selectedProduct && {
                ...selectedProduct,
              }),
              ...data,
              logo: [...images.filter(image => !image.file), ...s3Images][0],
              code: validCode.title && validCode.title.replaceAll(' ', ''),
            };
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateCoupon({ resolve, reject, payload });
              } else addCoupon({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(selectedProduct ? 'Coupon Updated' : 'Coupon Created');
                  setEditMode(true);
                  setData({
                    code: '',
                    description: '',
                    type: '',
                    taxInfo: '',
                  });
                  setSelectedProduct(null);
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
                  disabled={images && images.length === 1}
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
          <Box display="grid" className={classes.formWrapper}>
            <div>
              <div className={classes.formHeaders}>Coupon Code</div>
              <Autocomplete
                value={validCode}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setValidCode({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValidCode({
                      title: newValue.inputValue,
                    });
                  } else {
                    setValidCode(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
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
                options={validCodeOptions}
                getOptionDisabled={option => !option.inputValue}
                getOptionLabel={option => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                getOptionSelected={option => option.title === validCode.title}
                renderOption={option => option.title}
                style={{ width: 300 }}
                freeSolo
                renderInput={params => (
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    {...params}
                    variant="outlined"
                    value={validCode}
                    name="Coupon Type"
                    size="small"
                  />
                )}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Coupon Title</div>

              <TextValidator
                name="Coupon Title"
                onChange={e => handleChange(e.target.value, 'couponTitle')}
                value={couponTitle}
                fullWidth
                autoComplete="none"
                size="small"
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Coupon Description</div>

              <TextValidator
                name="Coupon Description"
                onChange={e =>
                  handleChange(e.target.value, 'couponDescription')
                }
                value={couponDescription}
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
              <div className={classes.formHeaders}>Coupon Type</div>
              <Select
                labelId="couponType"
                id="couponType"
                value={couponType || []}
                onChange={e => handleChange(e.target.value, 'couponType')}
                input={<Input label="Name" />}
                MenuProps={MenuProps}
                error={!couponType}
              >
                {['general', 'brand', 'city', 'item', 'customer'].map(
                  couponCat => (
                    <MenuItem key={couponCat} value={couponCat}>
                      {couponCat}
                    </MenuItem>
                  ),
                )}
              </Select>
              <FormHelperText error>
                {!couponType && 'Please Select Coupon Type'}
              </FormHelperText>
            </div>
            {couponType === 'brand' && (
              <div>
                <div className={classes.formHeaders}>Select Brands</div>
                <Select
                  labelId="brands"
                  id="brands"
                  value={brands || []}
                  onChange={e => handleChange(e.target.value, 'brands')}
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                  error={!brands.length > 0}
                  multiple
                >
                  {brandList &&
                    brandList.map(brand => (
                      <MenuItem key={brand.brandName} value={brand._id}>
                        {brand.brandName}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>
                  {!brands.length > 0 && 'Please Select Brand'}
                </FormHelperText>
              </div>
            )}
            {couponType === 'item' && (
              <div>
                <div>
                  <div className={classes.formHeaders}>Select Brand</div>

                  <Select
                    labelId="brands"
                    id="brands"
                    value={selBrand || []}
                    onChange={e => setSelBrand(e.target.value)}
                    input={<Input label="Name" />}
                    MenuProps={MenuProps}
                    error={!selBrand && !selBrand.length > 0}
                  >
                    {brandList &&
                      brandList.map((brand, i) => (
                        <MenuItem
                          key={`item-${brand.brandName}-${i}`}
                          value={brand._id}
                        >
                          {brand.brandName}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {!selBrand && !selBrand.length > 0 && 'Please Select Brand'}
                  </FormHelperText>
                </div>
                <div className={classes.formHeaders}>Select Items</div>
                <Select
                  labelId="items"
                  id="items"
                  value={items || []}
                  onChange={e => handleChange(e.target.value, 'items')}
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                  error={
                    selBrand &&
                    selBrand.length > 0 &&
                    items &&
                    !items.length > 0
                  }
                  multiple
                  disabled={!selBrand}
                >
                  {itemList &&
                    itemList.map(item => (
                      <MenuItem key={item.itemName} value={item._id}>
                        {item.itemName}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>
                  {selBrand &&
                    selBrand.length > 0 &&
                    items &&
                    !items.length > 0 &&
                    'Please Select Items'}
                </FormHelperText>
              </div>
            )}
            {couponType === 'city' && (
              <div>
                <div className={classes.formHeaders}>Select Cities</div>
                <Select
                  labelId="cities"
                  id="cities"
                  value={cities || []}
                  onChange={e => handleChange(e.target.value, 'cities')}
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                  error={!cities.length > 0}
                  multiple
                >
                  {cityList &&
                    cityList.map(city => (
                      <MenuItem key={city.name} value={city._id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>
                  {!cities.length > 0 && 'Please Select Cities'}
                </FormHelperText>
              </div>
            )}
            {couponType === 'customer' && (
              <div>
                <div className={classes.formHeaders}>Select Customer</div>
                <Select
                  labelId="customers"
                  id="customers"
                  value={customers || []}
                  onChange={e => handleChange(e.target.value, 'customers')}
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                  error={!customers.length > 0}
                  multiple
                >
                  {userList &&
                    userList.map(user => (
                      <MenuItem key={user.firstName} value={user._id}>
                        {`${user.firstName} (${user.phoneNumber}) `}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>
                  {!customers.length > 0 && 'Please Select Customers'}
                </FormHelperText>
              </div>
            )}
            <div>
              <div className={classes.formHeaders}>Discount</div>
              <Box display="flex" alignItems="flex-end">
                <TextValidator
                  id="outlined-select-currency"
                  select
                  value={discountType}
                  onChange={handleChangeDiscount}
                  style={{ width: 100 }}
                >
                  {['%', '₹'].map((option, i) => (
                    <MenuItem key={option} value={i}>
                      {option}
                    </MenuItem>
                  ))}
                </TextValidator>
                <TextValidator
                  validators={[
                    'required',
                    `${
                      discountType === 0
                        ? 'matchRegexp:^[0-9]{1,2}$'
                        : 'matchRegexp:^[0-9]{1,6}$'
                    }`,
                  ]}
                  errorMessages={[
                    'This field is required',
                    'Discount is not valid',
                  ]}
                  fullWidth
                  value={discount}
                  onChange={e => handleChange(e.target.value, 'discount')}
                  size="small"
                  variant="outlined"
                  autoComplete="none"
                  type="tel"
                  name="Discount"
                  inputProps={{ min: 0 }}
                />
              </Box>
            </div>
            <div>
              <div className={classes.formHeaders}>Total Count</div>
              <TextValidator
                validators={['required', 'matchRegexp:^[0-9]{1,6}$']}
                errorMessages={['This field is required', 'Count is not valid']}
                fullWidth
                value={totalCount}
                onChange={e => handleChange(e.target.value, 'totalCount')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="tel"
                name="Total Count"
                inputProps={{ min: 0 }}
              />
            </div>
            <div>
              <div className={classes.formHeaders}>Start Date</div>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  margin="normal"
                  id="startDate"
                  disablePast={!selectedProduct}
                  value={startDate}
                  renderInput={props => (
                    <TextValidator
                      {...props}
                      name="StartDate"
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  )}
                  onChange={date => handleChange(date, 'startDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <div className={classes.formHeaders}>End Date</div>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  margin="normal"
                  id="endDate"
                  disablePast={!selectedProduct}
                  minDate={
                    startDate === endDate
                      ? moment(startDate)
                          .add(1, 'day')
                          .format()
                      : moment(startDate)
                  }
                  value={endDate}
                  renderInput={props => (
                    <TextValidator
                      {...props}
                      name="EndDate"
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  )}
                  onChange={date => handleChange(date, 'endDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
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
  couponList: selectCouponMasterStoreByKey('couponList'),
  userList: selectGlobelStoreByKey('usersList'),
  brandList: selectBrandMasterStoreByKey('brandList'),
  cityList: selectLocationMasterStoreByKey('locationList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCoupon,
      updateCoupon,
      getCouponList,
      getBrandList,
      getProductListById,
      getLocationList,
      getUserList,
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
)(AddCoupon);
