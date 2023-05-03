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
import { addMeta, updateMeta, getMetaList } from '../actions';
import { selectMetaMasterStoreByKey } from '../selectors';
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

const AddMeta = ({
  addMeta,
  selectedProduct,
  setSelectedProduct,
  setEditMode,
  updateMeta,
  getMetaList,
  metaList,
  editMode,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [metaType, setMetaType] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [metaTypeOptions, setMetaTypeOptions] = useState();
  const [data, setData] = useState({
    name: '',
    description: '',
    type: '',
    taxInfo: '',
  });
  const [images, setImages] = useState();
  const [dataUrls, setDataUrls] = useState();
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const { name, description, type, taxInfo } = data;

  const errorPayload = {
    name: null,
    description: null,
    type: null,
    taxInfo: null,
  };

  useEffect(() => {
    if (selectedProduct) {
      setData({
        ...selectedProduct,
        ...(selectedProduct.type === 'tax' && {
          taxInfo: { ...selectedProduct.taxInfo[0] },
        }),
      });
      setMetaType({ title: selectedProduct.type });
      setImages(selectedProduct.metaLogo && [selectedProduct.metaLogo]);
    }
  }, [selectedProduct]);

  const handleChange = (val, str) => {
    if (str) {
      if (str === 'tax_description' || str === 'tax_percentage') {
        setData({
          ...data,
          taxInfo: { ...taxInfo, [str.replace('tax_', '')]: val },
        });
      } else {
        setData({ ...data, [str]: val });
      }
      let temp = errorMessage;
      if (val) {
        temp = { ...errorMessage, [str]: null };
      }
      setErrorMessage(temp);
    }
  };
  useEffect(() => {
    getMetaList();
  }, [editMode]);

  useEffect(() => {
    if (metaList) {
      const metaDataa = new Set(
        metaList.filter(m => !!m.type).map(m => m.type.toLowerCase()),
      );
      setMetaTypeOptions([...metaDataa].map(d => ({ title: d })));
    }
  }, [metaList]);

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
          if (name && description && metaType) {
            const payload = {
              ...(selectedProduct && {
                ...selectedProduct,
              }),
              isPublic: true,
              name: name.replaceAll(' ', '_'),
              description,
              metaLogo: [
                ...images.filter(image => !image.file),
                ...s3Images,
              ][0],
              type: metaType.title.replaceAll(' ', ''),
              ...(metaType.title === 'tax' && {
                taxInfo: {
                  ...(selectedProduct && {
                    ...selectedProduct.taxInfo[0],
                    metaId: selectedProduct._id,
                  }),
                  description: taxInfo.description,
                  percentage: +taxInfo.percentage,
                },
              }),
            };
            new Promise((resolve, reject) => {
              if (selectedProduct) {
                updateMeta({ resolve, reject, payload });
              } else addMeta({ resolve, reject, payload });
            })
              .then(res => {
                if (res.data.success) {
                  alert(selectedProduct ? 'Meta Updated' : 'Meta Created');
                  setEditMode(true);
                  setData({
                    name: '',
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
            <div>
              <div className={classes.formHeaders}>Meta Name</div>
              <TextValidator
                validators={['required']}
                errorMessages={['This field is required']}
                name="Meta Name"
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
              <div className={classes.formHeaders}>Description</div>
              <TextValidator
                validators={['required']}
                errorMessages={['This field is required']}
                fullWidth
                value={description}
                onChange={e => handleChange(e.target.value, 'description')}
                size="small"
                variant="outlined"
                autoComplete="none"
                type="text"
                multiline
                rows={3}
                name="Description"
              />
            </div>
            <div>
              <div className={classes.formHeaders}> Add / Select Meta Type</div>
              <Autocomplete
                value={metaType}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setMetaType({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setMetaType({
                      title: newValue.inputValue,
                    });
                  } else {
                    setMetaType(newValue);
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
                options={metaTypeOptions}
                // getOptionDisabled={option => !option.inputValue}
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
                getOptionSelected={option => option.title === metaType.title}
                renderOption={option => option.title}
                style={{ width: 300 }}
                freeSolo
                renderInput={params => (
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    {...params}
                    variant="outlined"
                    value={metaType}
                    name="Meta Type"
                  />
                )}
              />
            </div>
            {metaType && metaType.title && metaType.title === 'tax' && (
              <Fragment>
                <div>
                  <div className={classes.formHeaders}>Tax Percentage</div>
                  <TextValidator
                    validators={['required', 'matchRegexp:^[0-9]{1,2}$']}
                    errorMessages={[
                      'This field is required',
                      'Tax Percentage is not valid',
                    ]}
                    fullWidth
                    value={taxInfo.percentage}
                    onChange={e =>
                      handleChange(e.target.value, 'tax_percentage')
                    }
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    type="tel"
                    name="Tax Percentage"
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Tax Description</div>
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    fullWidth
                    value={taxInfo.description}
                    onChange={e =>
                      handleChange(e.target.value, 'tax_description')
                    }
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    type="text"
                    multiline
                    rows={3}
                    name="Tax Description"
                  />
                </div>
              </Fragment>
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
  metaList: selectMetaMasterStoreByKey('metaList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addMeta,
      updateMeta,
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
)(AddMeta);
