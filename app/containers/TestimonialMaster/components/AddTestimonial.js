import React, { useEffect, memo, useState, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Box, makeStyles, useTheme } from '@material-ui/core';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import ImageUploading from 'react-images-uploading';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { uploadFile } from 'react-s3';
import {
  addTestimonial,
  updateTestimonial,
  getTestimonialList,
} from '../actions';
import { fetchDeliveryLocations } from '../../HomePage/actions';
import { selectTestimonialMasterStoreByKey } from '../selectors';
import { selectGlobelStoreByKey } from '../../App/selectors';
import { config } from '../../../awsconfig';

const filter = createFilterOptions();
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

const AddTestimonial = ({
  addTestimonial,
  selectedProduct,
  setSelectedProduct,
  setEditMode,
  updateTestimonial,
  getTestimonialList,
  testimonialList,
  editMode,
  deliveryInLocations,
  fetchDeliveryLocations,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState();
  const [data, setData] = useState({
    name: '',
    feedback: '',
    city: '',
  });
  const [images, setImages] = useState();
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const { name, feedback, city } = data;

  useEffect(() => {
    if (selectedProduct) {
      setData({
        ...selectedProduct,
        city: {
          _id: selectedProduct.cityId && selectedProduct.cityId._id,
          name: selectedProduct.cityId && selectedProduct.cityId.name,
        },
      });
      setImages(selectedProduct.picture && [selectedProduct.picture]);
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
  useEffect(() => {
    getTestimonialList();
    fetchDeliveryLocations();
  }, [editMode]);

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
          if (name && feedback) {
            const payload = {
              ...(selectedProduct && {
                ...selectedProduct,
              }),
              name: name.replaceAll(' ', '_'),
              feedback,
              picture: [...images.filter(image => !image.file), ...s3Images][0],
              cityId: city && city._id,
            };
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateTestimonial({ resolve, reject, payload });
              } else addTestimonial({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(
                    selectedProduct
                      ? 'Testimonial Updated'
                      : 'Testimonial Created',
                  );
                  setEditMode(true);
                  setData({
                    name: '',
                    feedback: '',
                    city: '',
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
          <Box display="grid" className={classes.formWrapper}>
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
                    Click or Drop here
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
          </Box>
          <div>
            <div className={classes.formHeaders}>Testimonial Name</div>
            <TextValidator
              validators={['required']}
              errorMessages={['This field is required']}
              name="Testimonial Name"
              fullWidth
              value={name}
              onChange={e => handleChange(e.target.value, 'name')}
              size="small"
              variant="outlined"
              autoComplete="none"
              type="text"
            />
          </div>
          <div>
            <div className={classes.formHeaders}>Select City *</div>
            <Autocomplete
              options={(deliveryInLocations && deliveryInLocations.items) || []}
              getOptionLabel={option => option.name}
              getOptionSelected={(option, value) =>
                option &&
                option._id &&
                value &&
                value._id &&
                option._id === value._id
              }
              onChange={(e, val) => handleChange(val, 'city')}
              value={city}
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
                  value={city && city.name && city}
                />
              )}
            />
            {errorMessage && errorMessage.city && (
              <div className={classes.error}>{errorMessage.city}</div>
            )}
          </div>
          <div>
            <div className={classes.formHeaders}>Feedback</div>
            <TextValidator
              validators={['required']}
              errorMessages={['This field is required']}
              fullWidth
              value={feedback}
              onChange={e => handleChange(e.target.value, 'feedback')}
              size="small"
              variant="outlined"
              autoComplete="none"
              type="text"
              multiline
              rows={3}
              name="Feedback"
            />
          </div>
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
  testimonialList: selectTestimonialMasterStoreByKey('testimonialList'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryLocations,
      addTestimonial,
      updateTestimonial,
      getTestimonialList,
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
)(AddTestimonial);
