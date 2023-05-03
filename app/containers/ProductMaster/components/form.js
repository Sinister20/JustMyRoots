/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { Fragment, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Box,
  makeStyles,
  useTheme,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Select,
  Input,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  // useMediaQuery,
} from '@material-ui/core';
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
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import MomentUtils from '@date-io/moment';
import { uploadFile, deleteFile } from 'react-s3';
import {
  addProduct,
  getBrand,
  updateProduct,
  getProductListById,
} from '../actions';
import { getMetaList } from '../../MetaMaster/actions';
import { selectMetaMasterStoreByKey } from '../../MetaMaster/selectors';
import { selectGlobelStoreByKey } from '../../App/selectors';
import { selectProductMasterStoreByKey } from '../selectors';
// import { selectBrandMasterStoreByKey } from '../../BrandMaster/selectors';
import { fetchDeliveryLocations } from '../../HomePage/actions';
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
const AppWrapperContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 40px;
`;

const handlingDetailOptions = [
  {
    title: 'Raw & Fresh',
    desc:
      'All Raw & Fresh products are maintained between 3-8 degree C (for Interstate Products), till it reaches you. We neither Freeze nor add any preservatives to the product.  Please refrigerate (freezer section) immediately after receiving the Product',
  },
  {
    title: 'Cooked Food',
    desc:
      'All Cooked Food are maintained between 5-8 degree C (for Interstate Products) We neither Freeze nor add any preservatives. Our special packaging maintains the moisture in the food. Please refrigerate if not consumed immediately Heat for about 1min - 2min (or as required by you) before eating Use a Bowl of water at the side if heating Rice Items kulcha etc.',
  },
  {
    title: 'Sweets',
    desc:
      'Most of the Sweets, made from Milk Products, are perishable in nature. We maintain 5-8 degree C during the transit (for Inter State products), till it reaches you. Please refrigerate immediately after receiving the Product if consumption is not immediate.',
  },
  {
    title: 'Street Food',
    desc:
      'All Street food products are maintained at. 5-8 degree C (for Interstate Products). We neither Freeze nor add any preservatives. Please refrigerate if not consumed immediately. Best results if heated on a pan with a little oil, before consumption.',
  },
  {
    title: 'Bakery Products ',
    desc:
      'All Bakery Perishable Products are packed specially to keep the Freshness alive. For Interstate Products, we maintain a temperature of 5 8 Degrees C. No preservatives are added.',
  },
];
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
    gridTemplateColumns: '1fr 1fr 1fr 1fr ',
    gap: 15,
    alignItems: 'flex-end',
    padding: 15,
    border: `1px dashed ${theme.palette.primary.main}`,
  },
  formHeaders: {
    display: 'flex',
    fontSize: 16,
    color: '#000',
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
  gridFullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
  },
}));

const AddProductMaster = ({
  addProduct,
  updateProduct,
  getBrand,
  brandList,
  fetchDeliveryLocations,
  deliveryInLocations,
  selectedProduct,
  history,
  setEditMode,
  editMode,
  getMetaList,
  metaList,
  getProductListById,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [images, setImages] = useState();
  const [dataUrls, setDataUrls] = useState();
  const [updatedEl, setUpdatedEl] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [validName, setValidName] = useState(null);
  const [validNameOptions, setValidNameOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [validPreference, setValidPreference] = useState(true);

  const onChange = imageList => {
    setImages(imageList);
  };
  // const deleteAwsFile = file => {
  //   const filename = file.split('/').pop();
  //   // ;
  //   deleteFile(filename, config)
  //     .then(data => {
  //       //console.log(data);
  //       setDataUrls([data.location]);
  //     })
  //     .catch(err => console.error(err));
  // };

  const [pickupSlotTable, setPickupSlotTable] = useState([
    {
      slot: '',
      cutoffTime: '',
    },
  ]);
  const [pickupSlotPayload, setPickupSlotPayload] = useState([]);
  const [updatedElPickUp, setUpdatedElPickUp] = useState();

  const [brandTable, setBrandTable] = useState([
    {
      location: {},
      mrp: '',
      discount: '',
      startDate: moment().format(),
      endDate: moment()
        .add(1, 'day')
        .format(),
      isDeleted: false,
    },
  ]);
  const [state, setState] = useState({
    itemName: '',
    itemCode: '',
    hsn: '',
    ratings: '',
    priority: '',
    itemType: '',
    shortDescription: '',
    fullDescription: '',
    ingredient: '',
    handlingDetailTitle: '',
    handlingDetailDescription: '',
    disclaimer: '',
    UOMQTY: '',
    UOMUNIT: '',
    CommencementDate: moment().format(),
    handlingCharges: '',
    restrictedDaysForPickup: [],
    brand: '',
    purchasePrice: '',
    stockQuantity: '',
    productImages: [],
    metadata: '',
    metadataTax: '',
    mrp: '',
    discount: '',
    pickupSlots: [],
  });

  const {
    itemName,
    itemCode,
    hsn,
    ratings,
    priority,
    itemType,
    shortDescription,
    fullDescription,
    UOMQTY,
    UOMUNIT,
    CommencementDate,
    handlingCharges,
    restrictedDaysForPickup,
    brand,
    purchasePrice,
    stockQuantity,
    productImages,
    metadata,
    metadataTax,
    mrp,
    discount,
    ingredient,
    handlingDetailTitle,
    handlingDetailDescription,
    disclaimer,
  } = state;

  const values = {
    itemName,
    itemCode,
    hsn,
    ratings,
    priority,
    itemType,
    shortDescription,
    fullDescription,
    UOMQTY,
    UOMUNIT,
    CommencementDate,
    handlingCharges,
    restrictedDaysForPickup,
    brand,
    purchasePrice,
    stockQuantity,
    productImages,
    metadata,
    metadataTax,
    mrp,
    discount,
    ingredient,
    handlingDetailTitle,
    handlingDetailDescription,
    disclaimer,
  };

  const handleChange = (val, str) => {
    if (str) {
      setState({ ...state, [str]: val });
      str === 'itemType' && setValidPreference(!val);
      let temp = errorMessage;
      if (val) {
        temp = { ...errorMessage, [str]: null };
      }
      setErrorMessage(temp);
    }
  };

  useEffect(() => {
    getBrand();
    getMetaList();
    fetchDeliveryLocations();
  }, []);

  useEffect(() => {
    if (brand) {
      new Promise((resolve, reject) => {
        const selectedBrand =
          (selectedProduct &&
            selectedProduct.brand &&
            brandList.filter(
              b => b._id && b._id === selectedProduct.brand,
            )[0]) ||
          brand;
        getProductListById({ selectedBrand, resolve, reject });
      }).then(data => {
        setProductList(data);
      });
    } else {
      setProductList([]);
    }
  }, [brand]);

  useEffect(() => {
    if (selectedProduct) {
      const selectedMetaData = selectedProduct.metadata.map(m => m.metaId);
      const taxMetaData =
        metaList &&
        metaList
          .filter(
            meta => meta.type === 'tax' && selectedMetaData.includes(meta._id),
          )
          .map(meta => meta._id);
      const MetaData =
        metaList &&
        metaList
          .filter(
            meta => meta.type !== 'tax' && selectedMetaData.includes(meta._id),
          )
          .map(meta => meta._id);
      setState({
        ...selectedProduct,
        itemType: selectedProduct.filter[0],
        metadata: MetaData,
        metadataTax: taxMetaData,
        UOMQTY: selectedProduct.UOM && selectedProduct.UOM.split('|')[0],
        UOMUNIT: selectedProduct.UOM && selectedProduct.UOM.split('|')[1],
        handlingDetailTitle:
          selectedProduct.handlingDetail &&
          selectedProduct.handlingDetail.indexOf('|') > 0
            ? selectedProduct.handlingDetail.split('|')[0]
            : '',
        handlingDetailDescription:
          selectedProduct.handlingDetail &&
          selectedProduct.handlingDetail.indexOf('|') > 0
            ? selectedProduct.handlingDetail.split('|')[1]
            : '',
        CommencementDate: CommencementDate
          ? moment(CommencementDate).format()
          : moment().format(),
      });
      selectedProduct.pickupSlots &&
        selectedProduct.pickupSlots.length > 0 &&
        setPickupSlotTable(selectedProduct.pickupSlots);
      updatePickupSlotPayload(selectedProduct, selectedProduct.pickupSlots);

      setValidName({ title: selectedProduct.itemName });
      setImages(selectedProduct.productImages);
      const customFormat = selectedProduct.price.map((data, n) => ({
        ...data.priceId,
        mrp: `${data.priceId && data.priceId.mrp}`,
        discount: `${data.priceId && data.priceId.discount}`,
        location:
          deliveryInLocations &&
          deliveryInLocations.items.filter(
            loc => loc._id === (data.priceId && data.priceId.location),
          )[0],
        startDate: data.priceId.startDate
          ? moment(data.priceId.startDate).format()
          : moment().format(),
        endDate: data.priceId.endDate
          ? moment(data.priceId.endDate).format()
          : moment()
              .add(1, 'day')
              .format(),
      }));

      setBrandTable(customFormat);
      updatePriceInfoPayload(selectedProduct, customFormat);
    }
  }, [selectedProduct, deliveryInLocations]);

  const [priceInfoPayload, setPriceInfoPayload] = useState([]);

  const handleBrandPriceData = (value, str, n) => {
    const data = (updatedEl && [...updatedEl]) || [];
    data.push(n);
    const unique = new Set(data);
    setUpdatedEl([...unique]);
    if (str) {
      const temp = [...brandTable];
      temp[n] = { ...temp[n], [str]: value };
      setBrandTable(temp);
    }
  };

  const handlePriceInfo = idx => {
    if (
      brandTable[idx].mrp !== '' &&
      brandTable[idx].discount !== '' &&
      brandTable[idx].location &&
      brandTable[idx].startDate &&
      brandTable[idx].endDate
    ) {
      const temp = [...brandTable];
      updatePriceInfoPayload(selectedProduct, brandTable);
      setBrandTable(temp);
      const removeUpdatedKey = updatedEl.filter(el => el !== idx);
      setUpdatedEl(removeUpdatedKey);
    }
  };
  const addPriceInfo = idx => {
    const temp = [
      ...brandTable,
      {
        location: {},
        mrp: '',
        discount: '',
        startDate: moment().format(),
        endDate: moment()
          .add(1, 'day')
          .format(),
        isDeleted: false,
      },
    ];
    updatePriceInfoPayload(selectedProduct, brandTable);
    setBrandTable(temp);
  };

  const removeRow = n => {
    const temp = [...brandTable];
    !selectedProduct
      ? temp.splice(n, 1)
      : // : temp.length - 1 === n
        // ? (temp[n] = { ...temp[n], isDeleted: false })
        (temp[n] = { ...temp[n], isDeleted: true });
    setBrandTable(temp);
    updatePriceInfoPayload(selectedProduct, temp);
  };

  const updatePriceInfoPayload = (sp, prevData) => {
    const temp = [...prevData]
      .map(data => ({
        location: data && data.location && data.location._id,
        mrp: data && +data.mrp,
        discount: data && +data.discount,
        priceId: !sp ? undefined : data && data._id,
        isDeleted: !sp ? false : data && data.isDeleted,
        startDate: data && data.startDate,
        endDate: data && data.endDate,
      }))
      .filter(f => {
        if (Object.values(f).every(v => v !== '')) {
          return f;
        }
      });
    setPriceInfoPayload(temp);
  };

  const handlePickupSlotData = (value, str, n) => {
    const dataSet = (updatedElPickUp && [...updatedElPickUp]) || [];
    dataSet.push(n);
    const unique = new Set(dataSet);
    setUpdatedElPickUp([...unique]);
    if (str) {
      const temp = [...pickupSlotTable];
      if (temp.findIndex(slot => slot.slot === value) < 0)
        temp[n] = { ...temp[n], [str]: value };
      setPickupSlotTable(temp);
    }
  };

  const handlePickupSlotInfo = idx => {
    if (pickupSlotTable[idx].slot && pickupSlotTable[idx].cutoffTime) {
      const temp = [...pickupSlotTable];
      updatePickupSlotPayload(selectedProduct, pickupSlotTable);
      setPickupSlotTable(temp);
      const removeUpdatedKey = updatedElPickUp.filter(el => el !== idx);
      setUpdatedElPickUp(removeUpdatedKey);
    }
  };
  const addPickupSlot = idx => {
    const temp = [
      ...pickupSlotTable,
      {
        slot: '',
        cutoffTime: '',
      },
    ];
    updatePickupSlotPayload(selectedProduct, pickupSlotTable);
    setPickupSlotTable(temp);
  };

  const removePickupSlotRow = n => {
    const temp = [...pickupSlotTable];
    temp.splice(n, 1);
    // : // : temp.length - 1 === n
    //   // ? (temp[n] = { ...temp[n], isDeleted: false })
    //   (temp[n] = { ...temp[n], isDeleted: true });
    setPickupSlotTable(temp);
    updatePickupSlotPayload(selectedProduct, temp);
  };

  const updatePickupSlotPayload = (sp, prevData) => {
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

  useEffect(() => {
    if (productList && productList.length > 0) {
      const validNameData = new Set(productList.map(m => m.itemName));
      // const validItemCodeData = new Set(productList.map(m => m.itemCode));
      setValidNameOptions([...validNameData].map(d => ({ title: d })));
      // setValidBrandCodeOptions(
      //   [...validBrandCodeData].map(d => ({ title: d })),
      // );
    }
  }, [productList]);
  const onClickHandler = () => {
    let s3Images = [];
    setValidPreference(!itemType);
    //console.log(images);
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
            hsn &&
            ratings &&
            priority &&
            itemType &&
            purchasePrice &&
            brand
          ) {
            const payload = {
              ...(selectedProduct && { ...selectedProduct }),
              itemName: validName.title,
              itemCode,
              hsn,
              ratings,
              priority,
              itemType,
              filter: [itemType],
              shortDescription,
              brand: brand._id || brand,
              fullDescription,
              UOM: `${UOMQTY}|${UOMUNIT}`,
              CommencementDate,
              handlingCharges,
              restrictedDaysForPickup,
              purchasePrice: +purchasePrice,
              stockQuantity: +stockQuantity,
              ...(selectedProduct && { priceInfo: priceInfoPayload }),
              productImages: [
                ...images.filter(image => !image.file),
                ...s3Images,
              ],
              ingredient,
              handlingDetail: `${handlingDetailTitle}|${handlingDetailTitle &&
                handlingDetailOptions.filter(
                  option => option.title === handlingDetailTitle,
                )[0].desc}`,
              disclaimer:
                'The product images shown are for illustration purposes only and may not be an exact representation of the product. The manufacturer reserves the right to change the product images and specifications at any time without notice.',
              pickupSlots: pickupSlotPayload,
              metadata: [
                ...new Set([
                  ...metadata,
                  Array.isArray(metadataTax) ? metadataTax[0] : metadataTax,
                ]),
              ],
              ...(!selectedProduct && { mrp, discount }),
            };
            //console.log(payload);
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateProduct({ resolve, reject, payload });
              } else addProduct({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(
                    selectedProduct ? 'Product Updated' : 'Product Created',
                  );
                  setEditMode(true);
                  setState({
                    itemName: '',
                    itemCode: '',
                    hsn: '',
                    itemType: '',
                    shortDescription: '',
                    fullDescription: '',
                    UOMUNIT: '',
                    UOMQTY: '',
                    CommencementDate: '',
                    handlingCharges: '',
                    restrictedDaysForPickup: '',
                    brand: '',
                    purchasePrice: '',
                    stockQuantity: '',
                    metadata: '',
                    metadataTax: '',
                    mrp: '',
                    discount: '',
                    ingredient: '',
                    handlingDetailTitle: '',
                    handlingDetailDescription: '',
                    disclaimer: '',
                    ratings: '',
                    priority: '',
                  });
                  setPriceInfoPayload([]);
                  setDataUrls();
                  setBrandTable([
                    {
                      location: {},
                      mrp: '',
                      discount: '',
                      startDate: moment().format(),
                      endDate: moment()
                        .add(1, 'day')
                        .format(),
                      isDeleted: false,
                    },
                  ]);
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
  const handleChangemulti = event => {
    const {
      target: { value },
    } = event;
    handleChange(
      typeof value === 'string' ? value.split(',') : value,
      'restrictedDaysForPickup',
    );
  };

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <ValidatorForm
          onSubmit={() => onClickHandler()}
          onError={errors => console.log(errors)}
        >
          {state && (
            <Box>
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={1}
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
                              onClick={() => {
                                onImageRemove(index);
                                // deleteAwsFile(image);
                              }}
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
                  <div className={classes.formHeaders}>Brand</div>
                  <Autocomplete
                    options={(brandList && brandList) || []}
                    getOptionLabel={option => option.brandName}
                    getOptionSelected={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => handleChange(val, 'brand')}
                    value={
                      (selectedProduct &&
                        selectedProduct.brand &&
                        brandList.filter(
                          b => b._id === selectedProduct.brand,
                        )[0]) ||
                      values.brand
                    }
                    size="small"
                    disableClearable
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        variant="outlined"
                        name="Brand"
                        value={
                          (selectedProduct &&
                            selectedProduct.brand &&
                            brandList.filter(
                              b => b._id === selectedProduct.brand,
                            )[0]) ||
                          values.brand
                        }
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Item Name</div>
                  <Autocomplete
                    fullWidth
                    value={validName || {}}
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'string') {
                        setValidName({
                          title: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        setValidName({
                          title: newValue.inputValue,
                        });
                      } else {
                        setValidName(newValue);
                      }
                    }}
                    getOptionDisabled={option => !option.inputValue}
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
                    options={validNameOptions}
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
                    getOptionSelected={option =>
                      option.title === validName && validName.title
                    }
                    renderOption={option => option.title}
                    freeSolo
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        name="Item Name"
                        value={validName}
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Item Code</div>
                  <TextValidator
                    name="Item Code"
                    onChange={e => handleChange(e.target.value, 'itemCode')}
                    value={values.itemCode}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                    disabled
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>HSN Code</div>
                  <TextValidator
                    name="HSN Code"
                    onChange={e => handleChange(e.target.value, 'hsn')}
                    value={values.hsn}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={['required', 'matchRegexp:^[0-9]{1,8}$']}
                    errorMessages={[
                      'This field is required',
                      'HSN Code is not valid',
                    ]}
                    inputProps={{
                      maxLength: 8,
                    }}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Ratings</div>
                  <TextValidator
                    name="Ratings"
                    onChange={e => handleChange(e.target.value, 'ratings')}
                    value={values.ratings}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={[
                      'required',
                      `${
                        values.ratings < 5
                          ? 'matchRegexp:^[0-4](\\.\\d{1})?$'
                          : 'matchRegexp:^[5]{1}$'
                      }`,
                    ]}
                    errorMessages={[
                      'This field is required',
                      'Ratings is not valid',
                    ]}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Priority</div>
                  <TextValidator
                    name="Priority"
                    onChange={e => handleChange(e.target.value, 'priority')}
                    value={values.priority}
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
                <div className={classes.gridFullWidth}>
                  <div className={classes.formHeaders}>Preference</div>
                  <FormControl
                    component="fieldset"
                    fullWidth
                    error={!values.itemType}
                  >
                    <RadioGroup
                      aria-label="isVeg"
                      name="Preference"
                      className={classes.radioFilter}
                      value={values.itemType}
                      onChange={e => handleChange(e.target.value, 'itemType')}
                    >
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value="veg"
                        control={<Radio color="primary" size="small" />}
                        label="Veg"
                      />
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value="nonveg"
                        control={<Radio color="primary" size="small" />}
                        label="Non Veg"
                      />
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value="vegan"
                        control={<Radio color="primary" size="small" />}
                        label="Vegan"
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {!values.itemType && 'Please select Preference'}
                    </FormHelperText>
                  </FormControl>
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
                          validators={['matchRegexp:^[0-9]{2}-[0-9]{2}$']}
                          type="text"
                          placeholder="03-09"
                          errorMessages={['Slot is not valid eg(03)']}
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
                          errorMessages={[
                            // 'This field is required',
                            'Cut Off Time is not valid',
                          ]}
                        />
                      </div>
                      <div>
                        {updatedElPickUp &&
                          updatedElPickUp.map(
                            el =>
                              el === n && (
                                <Button
                                  onClick={() => handlePickupSlotInfo(n)}
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
                            onClick={() => removePickupSlotRow(n)}
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
                      onClick={() => addPickupSlot(pickupSlotTable.length + 1)}
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
                  <div className={classes.formHeaders}>Short Description</div>
                  <TextValidator
                    name="Item Short Description"
                    onChange={e =>
                      handleChange(e.target.value, 'shortDescription')
                    }
                    value={values.shortDescription}
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
                  <div className={classes.formHeaders}>Full Description</div>
                  <TextValidator
                    name="Item full Description"
                    onChange={e =>
                      handleChange(e.target.value, 'fullDescription')
                    }
                    value={values.fullDescription}
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
                  <div className={classes.formHeaders}>Ingredient</div>
                  <TextValidator
                    name="Item Ingredients"
                    onChange={e => handleChange(e.target.value, 'ingredient')}
                    value={values.ingredient}
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
                  <div className={classes.formHeaders}>Disclaimer</div>
                  <TextValidator
                    name="Item Disclaimer"
                    onChange={e => handleChange(e.target.value, 'disclaimer')}
                    value="The product images shown are for illustration purposes only and may not be an exact representation of the product. The manufacturer reserves the right to change the product images and specifications at any time without notice."
                    rows={4}
                    multiline
                    disabled
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"

                    // validators={['required']}
                    // errorMessages={['This field is required']}
                  />
                </div>
                <div className={classes.fullWidthGrid}>
                  <div className={classes.formHeaders}>Handling Detail</div>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="handlingDetailTitle"
                      id="handlingDetailTitle"
                      value={values.handlingDetailTitle || []}
                      onChange={e =>
                        handleChange(e.target.value, 'handlingDetailTitle')
                      }
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                    >
                      {handlingDetailOptions.map(item => (
                        <MenuItem key={item.title} value={item.title}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextValidator
                    name="Item Handling Details"
                    // onChange={e =>
                    //   handleChange(e.target.value, 'handlingDetailDescription')
                    // }
                    value={
                      handlingDetailTitle &&
                      handlingDetailOptions.filter(
                        option => option.title === handlingDetailTitle,
                      )[0].desc
                    }
                    disabled
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>UOM</div>
                  <TextValidator
                    name="UOMQTY"
                    onChange={e => handleChange(e.target.value, 'UOMQTY')}
                    value={values.UOMQTY}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    validators={['matchRegexp:^[0-9]{1,}$']}
                    errorMessages={['UOM Qty is not valid']}
                    inputProps={{
                      maxLength: 3,
                    }}
                  />
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="UOMUNIT"
                      id="UOMUNIT"
                      value={values.UOMUNIT || []}
                      onChange={e => handleChange(e.target.value, 'UOMUNIT')}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      error={!values.UOMUNIT}
                    >
                      {[
                        'Piece',
                        'Pieces',
                        'Plate',
                        'Kg',
                        'gm',
                        'Pack of 2',
                        'Pack of 4',
                        'Pack of 6',
                        'Pack of 8',
                        'Pack of 10',
                        'Pack of 12',
                      ].map(uom => (
                        <MenuItem key={uom} value={uom}>
                          {uom}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {UOMQTY && !values.UOMUNIT && (
                    <FormHelperText error>Please Select UOM</FormHelperText>
                  )}
                </div>

                <div>
                  <div className={classes.formHeaders}>Commencement Date</div>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk
                      variant="inline"
                      format="DD/MM/yyyy"
                      margin="normal"
                      id="CommencementDate"
                      disablePast={!selectedProduct}
                      value={CommencementDate}
                      renderInput={props => (
                        <TextValidator
                          {...props}
                          name="CommencementDate"
                          validators={['required']}
                          errorMessages={['This field is required']}
                        />
                      )}
                      onChange={date => handleChange(date, 'CommencementDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <div className={classes.formHeaders}>Handling Charges</div>
                  <TextValidator
                    name="Handling Charges"
                    onChange={e =>
                      handleChange(e.target.value, 'handlingCharges')
                    }
                    value={values.handlingCharges}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={['matchRegexp:^[0-9]{1,6}$']}
                    errorMessages={['Handling Charges is not valid']}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>
                    Restricted Days For Pickup
                  </div>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={values.restrictedDaysForPickup}
                      onChange={handleChangemulti}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      error={values.restrictedDaysForPickup.length === 7}
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
                      {values.restrictedDaysForPickup.length === 7 &&
                        'All days cannot be restricted days For Pickup'}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <div className={classes.formHeaders}>Purchase Price</div>
                  <TextValidator
                    name="Purchase Price"
                    onChange={e =>
                      handleChange(e.target.value, 'purchasePrice')
                    }
                    value={values.purchasePrice}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={['required', 'matchRegexp:^[0-9]{1,6}$']}
                    errorMessages={[
                      'This field is required',
                      'Purchase Price is not valid',
                    ]}
                  />
                </div>
                {!selectedProduct && (
                  <Fragment>
                    <div>
                      <div className={classes.formHeaders}>MRP</div>
                      <TextValidator
                        name="MRP"
                        onChange={e => handleChange(e.target.value, 'mrp')}
                        value={mrp}
                        fullWidth
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        type="tel"
                        error={+mrp < 0 || (+mrp > 0 && +mrp < +purchasePrice)}
                        validators={['matchRegexp:^[0-9]{1,6}$']}
                        errorMessages={[
                          // 'This field is required',
                          'Mrp is not valid',
                        ]}
                      />
                      {(+mrp < 0 || (+mrp > 0 && +mrp < +purchasePrice)) && (
                        <FormHelperText error>
                          Mrp should be greater than the purchase price.
                        </FormHelperText>
                      )}
                    </div>
                    <div>
                      <div className={classes.formHeaders}>Discount</div>
                      <TextValidator
                        name="Discount"
                        onChange={e => handleChange(e.target.value, 'discount')}
                        value={discount}
                        fullWidth
                        autoComplete="none"
                        size="small"
                        variant="outlined"
                        type="tel"
                        validators={['matchRegexp:^[0-9]{1,6}$']}
                        errorMessages={[
                          // 'This field is required',
                          'Discount is not valid',
                        ]}
                        error={+mrp < 0 || (+mrp > 0 && +mrp <= +discount)}
                      />
                      {(+mrp < 0 || (+mrp > 0 && +mrp <= +discount)) && (
                        <FormHelperText error>
                          Discount should be less than MRP.
                        </FormHelperText>
                      )}
                    </div>
                  </Fragment>
                )}
                <div>
                  <div className={classes.formHeaders}>Stock Quantity</div>
                  <TextValidator
                    name="Stock Quantity"
                    onChange={e =>
                      handleChange(e.target.value, 'stockQuantity')
                    }
                    value={values.stockQuantity}
                    fullWidth
                    autoComplete="none"
                    size="small"
                    variant="outlined"
                    type="tel"
                    validators={['required', 'matchRegexp:^[0-9]{1,4}$']}
                    errorMessages={[
                      'This field is required',
                      'Stock Quantity is not valid',
                    ]}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Select Meta Data</div>
                  <FormControl fullWidth size="small">
                    <Select
                      name="Meta Data"
                      multiple
                      value={values.metadata || []}
                      onChange={e => handleChange(e.target.value, 'metadata')}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                    >
                      {metaList &&
                        metaList
                          .filter(meta => meta.type !== 'tax')
                          .map(meta => (
                            <MenuItem key={meta.name} value={meta._id}>
                              {meta.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <div className={classes.formHeaders}>Select Tax Meta </div>
                  <FormControl fullWidth size="small">
                    <Select
                      name="Tax Meta Data"
                      value={values.metadataTax || []}
                      onChange={e =>
                        handleChange(e.target.value, 'metadataTax')
                      }
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}
                      error={
                        values.metadataTax && values.metadataTax.length === 0
                      }
                    >
                      {metaList &&
                        metaList
                          .filter(meta => meta.type === 'tax')
                          .map(meta => (
                            <MenuItem key={meta.name} value={meta._id}>
                              {meta.name}
                            </MenuItem>
                          ))}
                    </Select>
                    {
                      <FormHelperText error>
                        {values.metadataTax &&
                          values.metadataTax.length === 0 &&
                          'Please Select Tax'}
                      </FormHelperText>
                    }
                  </FormControl>
                </div>
                {selectedProduct && (
                  <div className={classes.fullWidthGrid}>
                    {brandTable.map((c, n) => (
                      <div
                        style={{
                          display: c.isDeleted ? 'none' : 'grid',
                          marginBottom: 5,
                        }}
                        className={classes.fullWidthGridBrandTable}
                      >
                        <div>
                          <div className={classes.formHeaders}>Location</div>
                          <Autocomplete
                            options={
                              (deliveryInLocations &&
                                deliveryInLocations.items) ||
                              []
                            }
                            getOptionLabel={option => option.name}
                            getOptionSelected={(option, value) =>
                              (option && value && option._id === value._id) ||
                              (option &&
                                value &&
                                option.name &&
                                value.name &&
                                option.name.toLowerCase() ===
                                  value.name.toLowerCase())
                            }
                            onChange={(e, val) =>
                              handleBrandPriceData(val, 'location', n)
                            }
                            value={c.location}
                            size="small"
                            disableClearable
                            renderInput={params => (
                              <TextValidator
                                {...params}
                                variant="outlined"
                                name={`locationName - ${n}`}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={c.location}
                              />
                            )}
                          />
                        </div>

                        <div>
                          <div className={classes.formHeaders}>MRP</div>
                          <TextValidator
                            name={`Price Data MRP - ${n}`}
                            onChange={e =>
                              handleBrandPriceData(e.target.value, 'mrp', n)
                            }
                            value={c.mrp}
                            fullWidth
                            autoComplete="none"
                            size="small"
                            variant="outlined"
                            type="tel"
                            error={
                              +c.mrp < 0 ||
                              (+c.mrp > 0 && +c.mrp < +purchasePrice)
                            }
                            validators={[
                              'required',
                              'matchRegexp:^[0-9]{1,6}$',
                            ]}
                            errorMessages={[
                              'This field is required',
                              'Mrp is not valid',
                            ]}
                          />
                          {(+c.mrp < 0 ||
                            (+c.mrp > 0 && +c.mrp < +purchasePrice)) && (
                            <FormHelperText error>
                              Mrp should be greater than the purchase price.
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <div className={classes.formHeaders}>Discount</div>
                          <TextValidator
                            name={`Price Data Discount - ${n}`}
                            onChange={e =>
                              handleBrandPriceData(
                                e.target.value,
                                'discount',
                                n,
                              )
                            }
                            value={c.discount}
                            fullWidth
                            autoComplete="none"
                            size="small"
                            variant="outlined"
                            type="tel"
                            error={
                              +c.mrp < 0 ||
                              (+c.mrp > 0 && +c.mrp <= +c.discount)
                            }
                            validators={[
                              'required',
                              'matchRegexp:^[0-9]{1,6}$',
                            ]}
                            errorMessages={[
                              'This field is required',
                              'Discount is not valid',
                            ]}
                          />
                          {(+c.mrp < 0 ||
                            (+c.mrp > 0 && +c.mrp <= +c.discount)) && (
                            <FormHelperText error>
                              Discount should be less than MRP.
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <div className={classes.formHeaders}>
                            Delivery-Barred Start Date
                          </div>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              autoOk
                              variant="inline"
                              format="DD/MM/yyyy"
                              margin="normal"
                              id="startDate"
                              disablePast={!selectedProduct}
                              value={c.startDate}
                              renderInput={props => (
                                <TextValidator
                                  {...props}
                                  name={`Price Data startDate - ${n}`}
                                  validators={['required']}
                                  errorMessages={['This field is required']}
                                />
                              )}
                              onChange={date =>
                                handleBrandPriceData(date, 'startDate', n)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                        <div>
                          <div className={classes.formHeaders}>
                            Delivery-Barred End Date
                          </div>
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
                                c.startDate === c.endDate
                                  ? moment(c.startDate)
                                      .add(1, 'day')
                                      .format()
                                  : moment(c.startDate)
                              }
                              value={c.endDate}
                              renderInput={props => (
                                <TextValidator
                                  {...props}
                                  name={`Price Data endDate - ${n}`}
                                  validators={['required']}
                                  errorMessages={['This field is required']}
                                />
                              )}
                              onChange={date =>
                                handleBrandPriceData(date, 'endDate', n)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
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
                                    Save Location
                                  </Button>
                                ),
                            )}
                          {brandTable.length > 1 && (
                            <Fragment>
                              <Button
                                onClick={() => removeRow(n)}
                                variact="outlined"
                                color="primary"
                                className={classes.btn}
                                disabled={brandTable.length === 1}
                              >
                                Delete Location
                              </Button>
                            </Fragment>
                          )}
                        </div>
                      </div>
                    ))}
                    {brandTable.length && (
                      <Button
                        onClick={() => addPriceInfo(brandTable.length + 1)}
                        // disabled={priceInfoPayload.length < 1}
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        style={{ color: '#fff', width: '100%' }}
                      >
                        Add Location
                      </Button>
                    )}
                  </div>
                )}
              </Box>
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
        </ValidatorForm>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  brandList: selectProductMasterStoreByKey('brandList'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  metaList: selectMetaMasterStoreByKey('metaList'),
  productList: selectProductMasterStoreByKey('productList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryLocations,
      addProduct,
      updateProduct,
      getBrand,
      getMetaList,
      getProductListById,
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
)(AddProductMaster);
