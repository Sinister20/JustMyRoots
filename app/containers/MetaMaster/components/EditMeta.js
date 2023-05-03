/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { getMetaList, deleteMeta } from '../actions';
import { selectMetaMasterStoreByKey } from '../selectors';
import ConfirmDialog from '../../../components/ConfirmDialog';

const useStyles = makeStyles(theme => ({
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
    gridTemplateColumns: '110px 250px 200px 400px 100px 250px 100px 100px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid #ccc',
      textAlign: 'center',
      padding: '0 10px',
    },
    '& img': {
      marginBottom: 10,
    },
  },
  elipses: {
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'hidden',
  },
}));

const EditMeta = ({
  editMode,
  setEditMode,
  setSelectedProduct,
  selectedLocation,
  getMetaList,
  metaList,
  deleteMeta,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (editMode) {
      getMetaList();
      setSelectedProduct(null);
    }
  }, [editMode, reload]);
  const handleConfirm = flag => {
    setOpen(flag);
  };

  const deleteItem = () => {
    if (deleteProductData) {
      //console.log(deleteProductData);
      new Promise((resolve, reject) => {
        const id = deleteProductData._id;
        deleteMeta({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };
  // useEffect(() => {}, [selectedLocation, metaList]);

  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(!editMode);
        }}
        color="primary"
        variant="contained"
        className={classes.editBtn}
      >
        {!editMode ? 'Edit Meta' : 'Add Meta'}
      </Button>

      {editMode && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {metaList &&
              metaList.map(el => (
                <TableRow>
                  <TableCell>{el.name && el.name}</TableCell>
                  <TableCell>{el.description && el.description}</TableCell>
                  <TableCell>{el.type && el.type}</TableCell>
                  {/* <TableCell>
                    {el.taxInfo &&
                      el.taxInfo[0] &&
                      (el.taxInfo[0].desc || el.taxInfo[0].description)}
                  </TableCell>
                  <TableCell>
                    {el.taxInfo && el.taxInfo[0] && el.taxInfo[0].percentage}
                  </TableCell> */}
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProduct(el);
                      setEditMode(false);
                    }}
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDeleteProductData(el);
                      handleConfirm(true);
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {deleteProductData && (
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          confirmTitle="Are you sure to delete this item ?"
          deleteProductData={{
            tableTitle: ['Name', 'Type', 'Description'],
            tableValues: [
              deleteProductData.name,
              deleteProductData.type,
              deleteProductData.description,
            ],
          }}
          deleteRow={deleteItem}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  metaList: selectMetaMasterStoreByKey('metaList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMetaList,
      deleteMeta,
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
)(EditMeta);
