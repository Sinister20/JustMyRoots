import React, { memo, useEffect, useState } from 'react';
import { Button, Divider, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectProductMasterStoreByKey } from '../selectors';
import ConfirmDialog from '../../../components/ConfirmDialog';
import {
  addProduct,
  getBrand,
  getProductListById,
  deleteProduct,
} from '../actions';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    width: 800,
    margin: '0 auto',
    overflow: 'hidden',
    paddingTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 20,
    },
  },
  editBtn: {
    color: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  listCard: {
    marginTop: 10,
    background: '#fff',
    boxShadow: '5px 5px 25px 0 #ececec',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: 'grid',
    gridTemplateColumns: '110px 230px 1fr 40px 100px 100px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid #ccc',
      textAlign: 'center',
      padding: '0 10px',
    },
  },
  elipses: {
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'hidden',
  },
}));

const Editproduct = ({
  editMode,
  setEditMode,
  getBrand,
  brandList,
  selectedProduct,
  setSelectedProdcut,
  getProductListById,
  deleteProduct,
}) => {
  const classes = useStyles();

  const [selectedBrand, setSelectedBrand] = useState();
  const [searchStr, setSearchStr] = useState();
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (editMode) {
      getBrand();
      setSelectedProdcut(null);
    }
  }, [editMode]);

  useEffect(() => {
    if (selectedBrand) {
      new Promise((resolve, reject) => {
        getProductListById({ selectedBrand, resolve, reject });
      }).then(data => {
        setProductList(data);
      });
    } else {
      setProductList([]);
    }
  }, [selectedBrand, editMode, reload]);

  const handleConfirm = flag => {
    setOpen(flag);
  };

  const deleteItem = () => {
    if (deleteProductData) {
      new Promise((resolve, reject) => {
        const id = deleteProductData._id;
        deleteProduct({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };

  return (
    <div className={classes.appWrapper}>
      <Button
        onClick={() => {
          setEditMode(!editMode);
        }}
        color="primary"
        variant="contained"
        className={classes.editBtn}
      >
        {!editMode ? 'Edit Item' : 'Add Item'}
      </Button>

      {editMode && (
        <div style={{ paddingBottom: 20, marginBottom: 40, minHeight: 500 }}>
          <Divider />
          <br />
          <Autocomplete
            value={selectedBrand}
            onChange={(event, newValue) => {
              setSelectedBrand(newValue);
            }}
            inputValue={searchStr}
            onInputChange={(event, newInputValue) => {
              setSearchStr(newInputValue);
            }}
            id="controllable-states-demo"
            options={brandList || []}
            getOptionLabel={option => option.brandName}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select Brand" variant="outlined" />
            )}
          />
          <br />
          {productList &&
            productList.map(el => (
              <>
                <div className={classes.listCard}>
                  <img
                    src={el.productImages[0]}
                    style={{ width: 100, height: 75, display: 'block' }}
                  />{' '}
                  <div>{el._id}</div>{' '}
                  <div className={classes.elipses}>
                    <span>
                      {el.itemName}
                      <br />
                      <small>{el.fullDescription}</small>
                    </span>
                  </div>
                  <div>{el.stockQuantity}</div>
                  <div>{el.purchasePrice}</div>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProdcut(el);
                      setEditMode(false);
                    }}
                  >
                    edit
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setDeleteProductData(el);
                        handleConfirm(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            ))}

          {deleteProductData && (
            <ConfirmDialog
              open={open}
              setOpen={setOpen}
              confirmTitle="Are you sure to delete this item ?"
              deleteProductData={{
                tableTitle: ['Code', 'Name', 'Type', 'Qty', 'Purchase Price'],
                tableValues: [
                  deleteProductData.itemCode,
                  deleteProductData.itemName,
                  deleteProductData.itemType,
                  deleteProductData.stockQuantity,
                  deleteProductData.purchasePrice,
                ],
              }}
              deleteRow={deleteItem}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  brandList: selectProductMasterStoreByKey('brandList'),
  productList: selectProductMasterStoreByKey('productList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBrand,
      getProductListById,
      deleteProduct,
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
)(Editproduct);
